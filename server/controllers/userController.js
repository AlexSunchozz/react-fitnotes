const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

const generateJwt = (id, login) => {
    return  jwt.sign({id, login}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {name, dateBurn, weight, height, gender, login, password} = req.body;

        if (!login && !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль!'));
        }

        const candidate = await User.findOne({where: {login}});

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует!'));
        }

        const user = await User.create({name, dateBurn, weight, height, gender, login, password});
        const token = generateJwt(user.id, user.login);

        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body;

        const user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден!'));
        }

        // let comparePassword = bcrypt.compareSync(password, user.password);
        if (password != user.password) {
            return next(ApiError.internal('Указан неверный пароль!'));
        }

        const token = generateJwt(user.id, user.login);

        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login);
        return res.json({token});
    }
}

module.exports = new UserController();