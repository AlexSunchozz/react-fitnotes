import { makeAutoObservable } from "mobx";

class MusculStore {
    constructor() {
        
        makeAutoObservable(this);
    }
    musculs = [];

    setMusculs(musculs) {
        this.musculs = musculs;
    }

    puschMusculs(muscul) {
        this.musculs.push(muscul);
    }

    updateMusculs() {
        this.musculs.pop();
    }

    clearMusculs() {
        this.musculs = []
    }
}

export default MusculStore;