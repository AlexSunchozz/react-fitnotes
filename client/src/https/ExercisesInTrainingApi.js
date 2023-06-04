import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const addExercisesInTraining = async (exerciseId, trainingId, date) => {
    const {data} = await $host.post('api/exercisesintraining', {exerciseId, trainingId, date});
    return data;
}

export const getPrevOrNextTraining = async (userId, date) => {
    
    const {data} = await $host.post('api/exercisesintraining/getprevornextraining',
        {
            userId: userId,
            date: date.toLocaleDateString()
        });
    return data;
}

export const getExercisesInTraining = async (userId, date) => {

    const {data} = await $host.post('api/exercisesintraining/getexercisefordate',
        {
            userId: userId,
            date: date.toLocaleDateString()
        });
    return data;
}

export const removeExercises = async (trainingId, exerciseId) => {
    const {data} = await $host.post('api/exercisesintraining/' + trainingId, {exerciseId})
    return data
}

export const getallexercisesofuser = async (trainingId) => {
    const {data} = await $authHost.post('api/exercisesintraining/getallexercisesofuser', {trainingId})
    return data;
}