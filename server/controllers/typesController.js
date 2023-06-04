const { TypeOfExercise, ExercisesTypes } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class TypesController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.img';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const type = await TypeOfExercise.create({name, img: fileName});

            return res.json(type);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const types = await TypeOfExercise.findAll()
        return res.json(types);
    }

    async getTypesOfexercises(req, res) {
        const {exercises} = req.body;

        let promises = []

        exercises.forEach(exercise => {
            promises.push(ExercisesTypes.findAll({where: {exerciseId: exercise.id}}))
        })

        let prom = []
        const result = await Promise.all(promises).then(data => {
            data.forEach(types => {
                prom.push(TypeOfExercise.findByPk(types[0].typeofexerciseId))
            })
        });

        const typesOfEx = await Promise.all(prom)
        return res.json(typesOfEx)
    }

    async findExercisesWithType(req, res) {
        const {typeId} = req.body;

        const exercises = await ExercisesTypes.findAll({where: {typeofexerciseId: typeId}})

        return res.json(exercises)
    }
}

module.exports = new TypesController();