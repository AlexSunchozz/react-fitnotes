import { makeAutoObservable } from "mobx";

class ProgressStore {
    constructor() {
        this.progress = [];
        makeAutoObservable(this);
    }

    setProgressOfEx(progress) {
        this.progress.push(progress)
    }
}

export default ProgressStore;