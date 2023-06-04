import { makeAutoObservable } from "mobx";

class ExercisesInTrainingStore {
    constructor() {
        this.exercisesInTraining = []
        makeAutoObservable(this);
    }

    setExercisesInTraining(exercisesInTraining) {
        this.exercisesInTraining = exercisesInTraining;
    }
}

export default ExercisesInTrainingStore;