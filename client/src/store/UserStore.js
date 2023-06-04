import { makeAutoObservable } from "mobx";

class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._userId = 0;
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setId(id) {
        this._userId = id;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get userId() {
        return this._userId;
    }
}

export default UserStore;