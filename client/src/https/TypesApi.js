import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const fetchTypes = async () => {
    const {data} = await $host.get('api/types');
    return data;
}

export const getTypesOfExercise = async (exercises) => {
    const {data} = await $authHost.post('api/types/gettypes', {exercises})
    return data
}

export const getexwithtype = async (typeId) => {
    const {data} = await $authHost.post('api/types/getexwithtype', {typeId});
    return data
}