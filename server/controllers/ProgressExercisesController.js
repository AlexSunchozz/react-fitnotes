const { ProgressOfExercises } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class ProgressExercises {
    async create(req, res) {
        try {
            const {progressId, exerciseId} = req.body;
            const response = ProgressOfExercises.create({progressId: progressId, exerciseId: exerciseId});
            
            return res.json(response);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ProgressExercises();