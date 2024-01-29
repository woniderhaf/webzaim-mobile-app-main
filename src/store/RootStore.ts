import { makeAutoObservable } from 'mobx';
import { BiometryType } from 'react-native-biometrics';
import { IArticle, ICalculator, ICommonStore, IRegistrationStore, IRootStore, RootStoreInitData } from '../core';
import { UNBOARDING_SHOWN } from '../core/constants';
import LocalStorage from '../core/local-storage';

import { AuthStore } from './AuthStore';
import { UserStore } from './UserStore';
import { LoanStore } from './LoanStore';
import { DictionaryStore } from './DictionaryStore';
import { UIStore } from './UIStore';
import { HistoryStore } from './HistoryStore';
import { CommonStore } from './CommonStore';
import { RegistrationStore } from './RegistrationStore';

export class RootStore implements IRootStore {
    authStore: AuthStore;

    userStore: UserStore;

    loanStore: LoanStore;

    dictionaryStore: DictionaryStore;

    uiStore: UIStore;

    historyStore: HistoryStore;

    commonStore: ICommonStore;

    registrationStore: IRegistrationStore;

    appState = 'active';

    backgroundTime = 0;

    onboardingStep = 0;

    onboardingShown = false;

    calculator: ICalculator | undefined = undefined;

    article: IArticle | undefined = undefined;

    sensor: BiometryType | undefined;

    constructor(appState: RootStoreInitData) {
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.loanStore = new LoanStore(this);
        this.dictionaryStore = new DictionaryStore(this);
        this.uiStore = new UIStore(this);
        this.historyStore = new HistoryStore(this);
        this.commonStore = new CommonStore(this);
        this.registrationStore = new RegistrationStore(this);

        this.hydrate(appState);

        this.changeAppState = this.changeAppState.bind(this);
        this.updateBackgroundTime = this.updateBackgroundTime.bind(this);

        this.changeOnboardingShown = this.changeOnboardingShown.bind(this);
        this.increaseStep = this.increaseStep.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    hydrate(appState: RootStoreInitData) {
        const { login, pwd, calculator, onboardingShown, token, pinCode, useBiometrics, user, sensor } = appState;

        this.calculator = calculator;
        this.onboardingShown = Boolean(onboardingShown);

        if (user) {
            this.userStore.setUser(user);
        }

        this.authStore.setUserLogin(login || '');
        this.authStore.setUserPassword(pwd || '');
        this.authStore.setToken(token || '');
        this.authStore.setPincode(pinCode || '');
        this.authStore.setUseBiometrics(Boolean(useBiometrics));

        const pincodeRequire = Boolean(
            this.onboardingShown
            && token
            && pinCode
            && user
        );

        this.authStore.requestPincode(pincodeRequire);

        this.sensor = sensor;
    }

    changeAppState(nextState: string) {
        this.appState = nextState;
    }

    updateBackgroundTime(time: number) {
        this.backgroundTime = time;
    }

    increaseStep() {
        this.onboardingStep += 1;
    }

    async changeOnboardingShown(nextState: boolean) {
        try {
            await LocalStorage.setItem(UNBOARDING_SHOWN, nextState);
        } finally {
            this.onboardingShown = nextState;
        }
    }

    setArticle(article?: IArticle) {
        this.article = article;
    }

    clear() {
        this.backgroundTime = 0;

        this.userStore.clear();
        this.loanStore.clear();
        this.dictionaryStore.clear();
        this.historyStore.clear();
    }
}
