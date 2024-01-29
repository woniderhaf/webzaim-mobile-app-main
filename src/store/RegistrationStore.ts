import { makeAutoObservable } from 'mobx';
import {
    IRegistrationStep,
    IRegistrationStore,
    IRootStore,
    RegistrationConfig,
    RegistrationConfirm,
    RegistrationData,
    RegistrationOption,
    RegistrationStepsMap
} from '../core';
import { getRegistrationConfig, getRegistrationConfirmation, postRegistration, WebzaimApi } from '../core/api';
import { REG_FORM, RegistrationType } from '../core/enums';
import { GLOBAL_ERROR_TEXT, USER_LOGIN, USER_PASSWORD, USER_TOKEN } from '../core/constants';
import { ROUTES } from '../navigation';
import LocalStorage from '../core/local-storage';

type FormErrorType = {
    key: keyof RegistrationData;
    message: string;
};

const STEPS: RegistrationStepsMap = {
    [ROUTES.REGISTRATION_VARIANTS]: {
        id: ROUTES.REGISTRATION_VARIANTS,
        title: 'Варианты регистрации',
        step: 0
    },
    [ROUTES.REGISTRATION]: {
        id: ROUTES.REGISTRATION,
        title: 'Регистрация',
        step: 1
    },
    [ROUTES.REGISTRATION_DOCUMENTS]: {
        id: ROUTES.REGISTRATION_DOCUMENTS,
        title: 'Документы',
        step: 1.1
    },
    [ROUTES.REGISTRATION_CONFIRMATION]: {
        id: ROUTES.REGISTRATION_CONFIRMATION,
        title: 'Подтверждение регистрации',
        step: 1.2
    },
    [ROUTES.REGISTRATION_PASSPORT]: {
        id: ROUTES.REGISTRATION_PASSPORT,
        title: 'Паспортные данные',
        step: 2
    },
    [ROUTES.REGISTRATION_ADDRESS]: {
        id: ROUTES.REGISTRATION_ADDRESS,
        title: 'Адрес регистрации',
        step: 3
    },
    [ROUTES.REGISTRATION_ADDITIONAL_DATA]: {
        id: ROUTES.REGISTRATION_ADDITIONAL_DATA,
        title: 'Дополнительная информация',
        step: 4
    },
    [ROUTES.REGISTRATION_LOAN_REQUEST]: {
        id: ROUTES.REGISTRATION_LOAN_REQUEST,
        title: 'Получение денег',
        step: 5
    },
    [ROUTES.REGISTRATION_MONEY_TRANSFER]: {
        id: ROUTES.REGISTRATION_MONEY_TRANSFER,
        title: 'Способ получения',
        step: 6
    }
};

/**
 * ¯\_(ツ)_/¯
 * api принимает одни поля, а ошибки возвращает с другими ключами
 * */
const BACKEND_FIELD_KEYS = {
    birthDay: REG_FORM.BIRTHDATE,
    birthday: REG_FORM.BIRTHDATE,
    first_name: REG_FORM.NAME,
    last_name: REG_FORM.SURNAME,
    middle_name: REG_FORM.PATRONYMIC,
    mob_phone: REG_FORM.PHONE
} as Record<string, string>;

export class RegistrationStore implements IRegistrationStore {
    rootStore: IRootStore;

    step = STEPS[ROUTES.REGISTRATION_VARIANTS];

    steps = STEPS;

    config: RegistrationConfig | null = null;

    regForm = {} as RegistrationData;

    errors: Array<FormErrorType> = [];

    globalError = '';

    confirmation: RegistrationConfirm | null = null;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.setStep = this.setStep.bind(this);
        this.fetchRegistrationConfig = this.fetchRegistrationConfig.bind(this);
        this.getConfirmationRegistration = this.getConfirmationRegistration.bind(this);
        this.signUp = this.signUp.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setGlobalError = this.setGlobalError.bind(this);

        makeAutoObservable(this);
    }

    get registrationOptions(): Array<RegistrationOption> {
        const options: Array<RegistrationOption> = [
            {
                type: RegistrationType.MANUAL
            }
        ];

        if (this.config?.tinkoffServiceEndpointRequest) {
            options.unshift({
                type: RegistrationType.TINKOFF,
                endpoint: this.config?.tinkoffServiceEndpointRequest
            });
        }

        if (this.config?.esiaServiceEndpointRequest) {
            options.unshift({
                type: RegistrationType.ESIA,
                endpoint: this.config?.esiaServiceEndpointRequest
            });
        }

        return options;
    }

    setStep(value: IRegistrationStep) {
        this.step = value;
    }

    setConfig(data: RegistrationConfig) {
        this.config = data;
    }

    async fetchRegistrationConfig() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getRegistrationConfig();

            if (data) {
                this.setConfig(data);
            }
        } finally {
            setLoading(false);
        }
    }

    setGlobalError(value: string) {
        this.globalError = value;
    }

    setErrors(errors: Record<string, any>) {
        let $errors: Array<FormErrorType> = [];

        Object.keys(errors).forEach(key => {
            if (this.regForm[key as keyof RegistrationData]) {
                $errors.push({
                    key: key as keyof RegistrationData,
                    message: errors[key][0]
                });
            } else if (BACKEND_FIELD_KEYS[key]) {
                /**
                 * ¯\_(ツ)_/¯
                 * api возвращает ошибки к полям с другими ключами полей
                 * */
                $errors.push({
                    key: BACKEND_FIELD_KEYS[key] as keyof RegistrationData,
                    message: errors[key][0]
                });
            } else if (key === 'login') {
                /**
                 * ¯\_(ツ)_/¯
                 * под ключом login api присылает общую ошибку
                 * */
                this.setGlobalError(errors[key][0]);
            }
        });

        this.errors = $errors;
    }

    async signUp(params: RegistrationData) {
        const { setLoading } = this.rootStore.uiStore;
        const { login } = this.rootStore.authStore;

        setLoading(true);
        this.setErrors([]);
        this.setGlobalError('');

        try {
            this.regForm = params;

            const { data, errors, message } = await postRegistration(params);

            if (data?.token) {
                /**
                 * если регистрация прошла успешно,
                 * то вернется токен и пользователь авторизован
                 * */
                WebzaimApi.token(data.token);

                await LocalStorage.setItem(USER_LOGIN, params.phoneNumber);
                await LocalStorage.updateItem(params.phoneNumber, {
                    [USER_TOKEN]: data.token,
                    [USER_PASSWORD]: params.password
                });
                await login(params.phoneNumber, params.password, data.token);

                return true;
            } else if (errors && (errors?.length || Object.keys(errors).length)) {
                this.setErrors(errors);

                return false;
            } else {
                this.setGlobalError(message || GLOBAL_ERROR_TEXT);

                return false;
            }
        } catch (e) {
            this.setGlobalError(GLOBAL_ERROR_TEXT);

            return false;
        } finally {
            setLoading(false);
        }
    }

    async getConfirmationRegistration() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data, errors } = await getRegistrationConfirmation();

            if (data) {
                this.setConfirmation(data);
            } else {
                const backendError = Array.isArray(errors?.confirmation_code) && errors?.confirmation_code.join(' ');

                this.setGlobalError(backendError || GLOBAL_ERROR_TEXT);
            }
        } catch (e) {
            this.setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    }

    setConfirmation(data: RegistrationConfirm | null) {
        this.confirmation = data;
    }
}
