import { makeAutoObservable } from 'mobx';
import { IAuthStore, IRootStore } from '../core';
import { PIN_CODE, USER_LOGIN, USER_TOKEN, USE_BIOMETRICS, USER_PASSWORD } from '../core/constants';
import { getCheckSession, postLogin, WebzaimApi } from '../core/api';
import LocalStorage from '../core/local-storage';

export class AuthStore implements IAuthStore {
    rootStore: IRootStore;

    auth = false;

    userLogin = '';

    userPassword = '';

    token = '';

    pinCode = '';

    useBiometrics = false;

    pincodeRequire = false;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.authentificate = this.authentificate.bind(this);
        this.setUseBiometrics = this.setUseBiometrics.bind(this);
        this.setUserLogin = this.setUserLogin.bind(this);
        this.setToken = this.setToken.bind(this);
        this.setPincode = this.setPincode.bind(this);
        this.requestPincode = this.requestPincode.bind(this);
        this.login = this.login.bind(this);
        this.loginPincode = this.loginPincode.bind(this);
        this.logout = this.logout.bind(this);
        this.changePinCode = this.changePinCode.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.setUserPassword = this.setUserPassword.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    authentificate(flag: boolean) {
        this.auth = flag;
    }

    setUseBiometrics(flag: boolean) {
        this.useBiometrics = flag;
    }

    setToken(token: string) {
        this.token = token;
    }

    setUserLogin(login: string) {
        this.userLogin = login;
    }

    setUserPassword(password: string) {
        this.userPassword = password;
    }

    setPincode(pinCode: string) {
        this.pinCode = pinCode;
    }

    requestPincode(value: boolean) {
        this.pincodeRequire = value;
    }

    async changePinCode(code: string, useBiometrics: boolean) {
        try {
            await LocalStorage.updateItem(this.userLogin, {
                [PIN_CODE]: code,
                [USE_BIOMETRICS]: useBiometrics
            });
        } finally {
            this.setPincode(code);
        }
    }

    async login(login: string, password: string, token: string) {
        let pinCode = '';
        let biometrics = false;

        try {
            const storedData = await LocalStorage.getItem(login);

            pinCode = (storedData && storedData[PIN_CODE]) || '';
            biometrics = (storedData && storedData[USE_BIOMETRICS]) || false;

            await LocalStorage.setItem(USER_LOGIN, login);
            await LocalStorage.updateItem(login, {
                [USER_TOKEN]: token,
                [USER_PASSWORD]: password
            });
        } finally {
            this.setToken(token);
            this.setUserLogin(login);
            this.setUserPassword(password);
            this.setPincode(pinCode);
            this.setUseBiometrics(biometrics);
            this.requestPincode(!pinCode);
            this.authentificate(true);
        }
    }

    async loginPincode(code: string, useBiometrics: boolean) {
        try {
            await LocalStorage.updateItem(this.userLogin, {
                [PIN_CODE]: code,
                [USE_BIOMETRICS]: useBiometrics
            });
        } finally {
            this.setPincode(code);
            this.authentificate(true);
            this.requestPincode(false);
        }
    }

    async logout(silent?: boolean) {
        try {
            await LocalStorage.setItem(this.userLogin, {
                [USER_TOKEN]: '',
                [USER_PASSWORD]: '',
                [PIN_CODE]: '',
                [USE_BIOMETRICS]: false
            });
        } finally {
            this.clear();
        }
    }

    async updateSession(): Promise<boolean> {
        const { data } = await getCheckSession();

        if (data) {
            return true;
        } else if (this.userPassword && this.userLogin) {
            const loginResponse = await postLogin(this.userLogin, this.userPassword);

            if (loginResponse?.data?.token) {
                WebzaimApi.token(loginResponse.data.token);
                this.setToken(loginResponse.data.token);
            }

            return true;
        }

        return false;
    }

    clear() {
        this.auth = false;
        this.token = '';
        this.pinCode = '';
        this.userPassword = '';
        this.useBiometrics = false;
        this.pincodeRequire = false;
        this.rootStore.clear();
    }
}
