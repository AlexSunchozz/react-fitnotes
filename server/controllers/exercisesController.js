const { Exercises, ExercisesTypes } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class ExercisesController {
    async create(req, res, next) {
        try {
            const {name, description, targetmuscleId} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.gif';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const exercise = await Exercises.create({name, description, img: fileName, targetmuscleId});

            return res.json(exercise);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getWithType(req, res) {

        const {id} = req.params;
        let exercises = await ExercisesTypes.findAll({where: {typeofexerciseId : id}});

        let promises = [];

        exercises.forEach( (exercise) => {
            promises.push(Exercises.findByPk(exercise.exerciseId));
        });

        let exerciseList = await Promise.all(promises);

        return res.json(exerciseList);
    }

    async addExercises(req, res) {
        const {id} = req.params;
        return res.json();
    }

    async getAll(req, res) {
        const exercises = await Exercises.findAll()
        
        return res.json(exercises);
    }
}

module.exports = new ExercisesController();