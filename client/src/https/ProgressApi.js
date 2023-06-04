import { $authHost, $host } from "./index";
import { EXERCISES_ROUTE } from "../components/utils/consts";
import jwt_decode from 'jwt-decode';

export const addProgress = async (numberapproach, weightofinventory, repetition, exerciseId, trainingId, dateTraining) => {
    console.log(dateTraining)
    const {data} = await $authHost.post(`api/progress`, {numberapproach, weightofinventory, repetition, exerciseId, trainingId, dateTraining});
    return data;
}

export const getProgress = async (exerciseId, trainingId) => {
    const {data} = await $host.post('api/progress/getprogress' , {exerciseId, trainingId})
    return data;
}

export const deleteProgress = async (id) => {
    const {data} = await $host.post('api/progress/deleteprogress' , {id})
    return data;
}
 export const findProgressOfExercise = async (trainings, exerciseId) => {
    const {data} = await $authHost.post('api/progress/getfullprogressofexercise', {trainings, exerciseId})
    return data;
 }
