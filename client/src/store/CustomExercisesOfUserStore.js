import { makeAutoObservable } from "mobx";

class CustomExercisesOfUserStore {
    constructor() {
        this.customExersises = []
        makeAutoObservable(this);
    }

    addCustomExersises(exercise) {
        this.customExersises.push(exercise)
    }
}

export default CustomExercisesOfUserStore;