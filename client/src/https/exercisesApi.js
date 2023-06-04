import { $authHost, $host } from "./index";
import { EXERCISES_ROUTE } from "../components/utils/consts";
import jwt_decode from 'jwt-decode';

export const fetchExercisesWithType = async (typeId) => {
    const {data} = await $authHost.get(`api/exercises/` + typeId);
    return data;
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/exercises');
    return data
}