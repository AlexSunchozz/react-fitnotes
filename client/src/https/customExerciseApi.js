import { $host } from "./index";


export const postCustomExercise = async (formData) => {
    const {data} = await $host.post(`api/custom`, formData);
    return data;
}

export const getExercises = async (userId, typeId) => {
    const {data} = await $host.post(`api/custom/getcustom`, {userId, typeId});
    return data;
}