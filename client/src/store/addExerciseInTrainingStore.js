import { makeAutoObservable } from "mobx";

class AddExerciseInTrainingStore {
    constructor() {
        
        makeAutoObservable(this);
    }
    exercises = [];

    addInTraining(exercise) {
        this.exercises = exercise
    }
}

export default AddExerciseInTrainingStore;