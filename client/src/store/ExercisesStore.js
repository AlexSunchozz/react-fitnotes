import { makeAutoObservable } from "mobx";

class ExercisesStore {
    constructor() {
        
        makeAutoObservable(this);
    }
    exercises = [];

    setExercises(exercises) {
        this.exercises = exercises;
    }

    setCustom(custom) {
        this.exercises.push(custom)
    }

    addInTraining(exercise) {
        this.exercises.push(exercise)
    }
}

export default ExercisesStore;