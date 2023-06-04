const { ExercisesInTraining, Exercises, Training, ProgressInExercise } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class ExercisesItTtainingController {
    async create(req, res, next) {
        try {
            const {exerciseId, trainingId, date} = req.body;

            const response = await ExercisesInTraining.create({exerciseId: exerciseId, trainingId: trainingId, date: date});
            
            return res.json(response);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getPrevOrNextTraining(req, res) {
       
        const {userId, date} = req.body;
        
            const training = await Training.findAll({where: {userId: userId}})
            const trainingUserCurrent = training.filter(training => 
                
                training.date.toLocaleDateString() === date)

            return res.json(trainingUserCurrent)
    }

    async remove(req, res) {

        const {id} = req.params
        const {exerciseId} = req.body;
       
        const response = await ExercisesInTraining.destroy({where: {trainingId: id, exerciseId: exerciseId}})
        return res.json(response)
    }

    async getExercisesInTraining(req, res, next) {
        try {
            
            const {userId, date} = req.body;
            const training = await Training.findAll({where: {userId: userId}})
            const trainingUserCurrent = training.filter(training => 
                training.date.toLocaleDateString() === date)
            let exercisesInTraining = await ExercisesInTraining.findAll({where: {trainingId: trainingUserCurrent[0].id}})

            let promises = []
            exercisesInTraining.forEach(exercise => {
                promises.push(Exercises.findAll({where: {id: exercise.exerciseId}}))
            })

            let exercises = await Promise.all(promises)
            
            return res.json(exercises);

        } catch(e) {

            next(ApiError.badRequest(e.message));
            
        }
    }

    async getAllOfUser(req, res) {
        const {trainingId} = req.body;
        let promises = []
        trainingId.forEach(training => {
            promises.push(ExercisesInTraining.findAll({where: {trainingId: training.id}}))
        })


        let promisesExercise = []
        const exercise = await Promise.all(promises).then(data => {
            
            data.forEach(data => {
                data.forEach(exerciseId => {
                    promisesExercise.push(Exercises.findByPk(exerciseId.exerciseId))
                })
            })
        })

        const exercises = await Promise.all(promisesExercise)
        
        return res.json(exercises)
    }

    async addExerciseInCurrentTraining(req, res) {
        try {
            const {id} = req.body;
            const response = await ExercisesInTraining.findAll({where: {trainingId: id}})

            let promises = [];

            response.forEach( (exercise) => {
                promises.push(Exercises.findByPk(exercise.exerciseId));
            });

            let exerciseList = await Promise.all(promises);  
            
            return res.json(exerciseList);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new ExercisesItTtainingController();