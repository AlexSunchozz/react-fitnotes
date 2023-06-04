import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const addTrainingOfUser = async (name, date, userId) => {
    const {data} = await $host.post('api/trainings', {name, date, userId});
    return data;
}

export const getTrainingsOfUser = async (userId) => {
    const {data} = await $host.post('api/trainings', {userId});
    return data;
}

export const getExercisesOfTraining = async (trainingId) => {
    const {data} = await $host.get('api/trainings/' + trainingId);
    return data;
}

export const renameTraining = async (trainingId, name) => {
    const {data} = await $host.post('api/trainings/' + trainingId, {name})
}

export const removeTraining = async (trainingId) => {
    const {data} = await $host.post('api/trainings/delete/' + trainingId)
}

export const getTrainings = async (id) => {
    const {data} = await $host.post('api/trainings/trainingofuser/' + id);
    return data;
}