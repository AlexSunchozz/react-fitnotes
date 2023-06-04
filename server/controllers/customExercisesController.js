const { TypeOfCustomExercise, CustomExercises } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class CustomExercisesController {
    async create(req, res, next) {
        
        try {
            const {name, description, userId, typeId} = req.body;
            console.log(req.body)
            let fileName;
            if (req.files) {
                const {img} = req.files;
                fileName = uuid.v4() + '.img';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            } else {
                fileName = null;
            }
            
            const customExercise = await CustomExercises.create({name, description, img: fileName});
            
            let exCustomId = JSON.stringify(customExercise.id)
            const typesOfCustom = await TypeOfCustomExercise.create({userId: userId, customexerciseId: exCustomId, typeofexerciseId: typeId})

            return res.json(customExercise);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getExesise(req, res) {

        const {userId, typeId} = req.body;
        const resp = await TypeOfCustomExercise.findAll({where: {userId: userId, typeofexerciseId: typeId}})
        
        let promises = [];

        resp.forEach( (exercise) => {
                promises.push(CustomExercises.findByPk(exercise.customexerciseId));
            });

            let exerciseList = await Promise.all(promises);  
            
            return res.json(exerciseList);
    }
}

module.exports = new CustomExercisesController()