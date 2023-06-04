import { $authHost, $host } from "./index";
import { EXERCISES_ROUTE } from "../components/utils/consts";
import jwt_decode from 'jwt-decode';

export const addProgressOfExercises = async (progressId, exerciseId) => {
    const {data} = await $authHost.post(`api/progressofexercises/`, {progressId, exerciseId});
    return data;
}