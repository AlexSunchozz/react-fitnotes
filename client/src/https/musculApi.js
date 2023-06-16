import { $authHost, $host } from "./index";
import { EXERCISES_ROUTE } from "../components/utils/consts";
import jwt_decode from 'jwt-decode';

export const fetchMuscle = async (id) => {
    const {data} = await $authHost.get(`api/musculs/` + id);
    return data;
}

export const getIdMuscul = async (name) => {
    const {data} = await $authHost.post('api/musculs/getId', {name});
    return data
}