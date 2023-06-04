const {Training, ExercisesInTraining } = require('../models/models');
const ApiError = require('../error/ApiError'); 

class TrainingsController {
    async create(req, res) {
        const {name, date, userId} = req.body;
        
        const training = await Training.create({name, date, userId});

        return res.json(training);
    }

    async renameTraining(req, body) {
        const {id} = req.params;
        const {name} = req.body;

        const training = await Training.findByPk(id)
        training.name = name
        const update = await training.save()
    }

    async remove(req, res) {
        const {id} = req.params;
        const deleteTraining = await Training.destroy({where: {id: id}})

        return res.json(deleteTraining)
    }

    async getAll(req, res) {
        const {id} = req.params
        
        const trainings = await Training.findAll({where: {userId: id}});
        return res.json(trainings);   
    }

    async getExercisesInTraining(req, res) {

        const {id} = req.params;

        const responce = ExercisesInTraining.findAll({where: {trainingId: id}})

        return res.json(responce)
    }
}

module.exports = new TrainingsController();