const { Progress, ProgressOfExercises, ExercisesInTraining } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { where } = require("sequelize");
const { ProgressInExercise } = require("../models/models");

class ProgressController {

    async create(req, res, next) {
        try {
            const {numberapproach, weightofinventory, repetition, exerciseId, trainingId, dateTraining} = req.body;
            console.log(req.body)
            const progress = await Progress.create({numberapproach, weightofinventory, repetition, date: dateTraining});
           
            console.log(req.body)
            const exercise = await ExercisesInTraining.findAll({where: {trainingId: trainingId, exerciseId: exerciseId}})


            const result = await ProgressInExercise.create({progressId: progress.id, exercisesintrainingId: exercise[0].id})
            return res.json(result);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getExerciseProgress( req, res) {
        const {exerciseId, trainingId} = req.body;

        let progressOfExercise;
        const progress = await ExercisesInTraining.findOne({where :{trainingId: trainingId, exerciseId: exerciseId}})

        if (progress !== null) {
            const getProgress = await ProgressInExercise.findAll({where: {exercisesintrainingId: progress.id}})

            let promises = [];
            getProgress.forEach(progress => {
                promises.push(Progress.findByPk(progress.progressId))
            })
    
            progressOfExercise = await Promise.all(promises)

            return res.json(progressOfExercise)
        } else {
            return res.json([])
        }
    }

    async deleteProgress(req, res) {
        const {id} = req.body;

        const resp = await Progress.destroy({where: { id: id }});

        return res.json(resp)
    }

    async getFullProgressOfExercise(req, res) {
        const {trainings, exerciseId} = req.body;
        let promises = [];
        trainings.forEach(training => {
            promises.push(ExercisesInTraining.findAll({where: {trainingId: training.id, exerciseId:exerciseId}}))
        })

        let promProgress = [];
        const numberOfWrite = await Promise.all(promises).then(data => {
            data.forEach(elem => {
                console.log(elem[0])
                if (elem[0]) {
                    promProgress.push(ProgressInExercise.findAll({where: {exercisesintrainingId: elem[0].id}}))
                }
            })
        })

        let prog = []
        const progressId = await Promise.all(promProgress).then(data => {
            data.forEach(elem => {
                elem.forEach(e => {
                    prog.push(Progress.findByPk(e.progressId))
                })

            })
        })

        const progress = await Promise.all(prog)
        return res.json(progress)
    }

    async getAll(req, res) {
        const {id} = req.params
        const progress = await TargetMusсle.findAll({where: {id: id}})
        return res.json(musculs);
    }
}

module.exports = new ProgressController();