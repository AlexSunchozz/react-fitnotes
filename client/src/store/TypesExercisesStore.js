import { makeAutoObservable } from "mobx";

class TypesExercisesStore {
    constructor() {
        this._types = [];
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    get types() {
        return this._types;
    }
}

export default TypesExercisesStore;