import { makeAutoObservable } from "mobx";

class TrainingsStore {
    constructor() {
        this.trainings = [];
        makeAutoObservable(this);
    }

    setTraining(training){
        this.trainings = training;
    }
}

export default TrainingsStore;