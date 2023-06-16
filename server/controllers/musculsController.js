const { TargetMusсle } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { where } = require("sequelize");

class MusculsController {

    async create(req, res, next) {
        try {
            const {name} = req.body;

            const muscul = await TargetMusсle.create({name});

            return res.json(muscul);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {id} = req.params
        const musculs = await TargetMusсle.findAll({where: {id: id}})
        return res.json(musculs);
    }

    async getIdMuscul(req, res) {
        const {name} = req.body
        const idMuscul = await TargetMusсle.findOne({where: {name: name}})
        return res.json(idMuscul)
    }
}

module.exports = new MusculsController();