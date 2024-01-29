import { getDay, getYear } from 'date-fns';
import { IFormData } from '..';
import { ADDRESS_FORM } from '../enums';
import { IAddress } from '../interfaces';
import { AddressErrors } from '../types';
import { getAge } from './helpers';

const EMAIL_REGEXP =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_REGEXP_SEVEN = /^(\+)7?[0-9]{10}$/;
const PHONE_REGEXP = /^8[0-9]{10}$/;
const PASSWORD_REGEXP = /^[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/;

export const isEmail = (value: string): boolean => EMAIL_REGEXP.test(value);

export const isPhone = (value: string): boolean => PHONE_REGEXP.test(value) || PHONE_REGEXP_SEVEN.test(value);

const isPassword = (value: string): boolean => PASSWORD_REGEXP.test(value);

export const loginValidator = (message: string = 'Неверно указан номер телефона или Email') => {
    return (value: string): string => {
        return !isPhone(value) && !isEmail(value) ? message : '';
    };
};

export const phoneValidator = (message: string = 'Неверно указан номер телефона') => {
    return (value: string): string => {
        return !isPhone(value) ? message : '';
    };
};

export const emailValidator = (message: string = 'Неверно указан номер Email') => {
    return (value: string): string => {
        return !isEmail(value) ? message : '';
    };
};

export const requiredValidator = (message: string = 'Поле обязательно для заполнения') => {
    return (value: string): string => {
        return !value ? message : '';
    };
};

export const compareValidator = (key: string, message: string = 'Поля не совпадают') => {
    return (value: string, data: IFormData): string => {
        const compareValue = data[key]?.value;

        return !compareValue || compareValue !== value ? message : '';
    };
};

export const addressValidator = (message: string = 'Неверно указан адрес') => {
    return (value: IAddress, data: IFormData): AddressErrors => {
        const errors: AddressErrors = {};
        const requiredMessage = 'Поле обязательно для заполнения';

        if (!value?.cityKladrId) {
            const localMessage = value?.cityKladrId ? message : requiredMessage;

            errors[ADDRESS_FORM.REGION] = localMessage;
            errors[ADDRESS_FORM.CITY] = localMessage;
        }

        if (!value?.street?.trim()) {
            const localMessage = value?.street?.trim() ? message : requiredMessage;

            errors[ADDRESS_FORM.STREET] = localMessage;
        }

        if (!value?.house?.trim()) {
            const localMessage = value?.house?.trim() ? message : requiredMessage;

            errors[ADDRESS_FORM.HOUSE] = localMessage;
        }

        return errors;
    };
};

export const passwordValidator = (message: string = 'Некорректно задан пароль') => {
    return (value: string): string => {
        return !isPassword(value) ? message : '';
    };
};

export const passportIssueDateValidator = (birthDay: number = 0) => {
    const birthDayToMS = birthDay * 1000;
    const currentTime = Date.now();
    const userAge = getAge(birthDayToMS);
    const lowerLimit = new Date(birthDayToMS);
    const upperLimit = new Date(birthDayToMS);
    const dateReceiptPassport = new Date(birthDayToMS);

    // Буферное время - сколько времени со дня рождения действует старый паспорт
    const bufferTimeDays = 90; // 90 дней
    const creationTimeYears = 14; //14 лет;
    const firstReplacementTimeYears = 20; //20 лет
    const secondReplacementTimeYears = 45; //45 лет
    const lastReplacementTimeYears = 100; //100 лет

    dateReceiptPassport.setFullYear(dateReceiptPassport.getFullYear() + creationTimeYears);

    switch (true) {
        case userAge <= 14:
            lowerLimit.setFullYear(lowerLimit.getFullYear() + creationTimeYears);
            upperLimit.setFullYear(lowerLimit.getFullYear() + creationTimeYears);
            upperLimit.setDate(lowerLimit.getDate() + bufferTimeDays);
            break;

        case userAge > 14 && userAge <= 20:
            lowerLimit.setFullYear(lowerLimit.getFullYear() + creationTimeYears);
            upperLimit.setFullYear(lowerLimit.getFullYear() + firstReplacementTimeYears);
            upperLimit.setDate(lowerLimit.getDate() + bufferTimeDays);
            break;

        case userAge > 20 && userAge <= 45:
            lowerLimit.setFullYear(lowerLimit.getFullYear() + firstReplacementTimeYears);
            upperLimit.setFullYear(lowerLimit.getFullYear() + secondReplacementTimeYears);
            upperLimit.setDate(lowerLimit.getDate() + bufferTimeDays);
            break;

        case userAge > 45:
            lowerLimit.setFullYear(lowerLimit.getFullYear() + secondReplacementTimeYears);
            upperLimit.setFullYear(lowerLimit.getFullYear() + lastReplacementTimeYears);
            break;
    }

    return (value: Date): string => {
        const issueDate = value;
        const issueDateToMS = value.getTime();

        switch (true) {
            case issueDateToMS < birthDayToMS:
            case issueDate < dateReceiptPassport:
                return 'Проверте даты рождения и выдачи паспорта';
            case issueDateToMS > currentTime && getDay(issueDateToMS) !== getDay(currentTime):
                return 'Неверная дата';
            case lowerLimit <= issueDate && issueDate <= upperLimit:
                return '';
            default:
                return 'Паспорт просрочен';
        }
    };
};

export const passportValidator = (message: string = 'Укажите серию и номер паспорта в формате 1234 123456') => {
    return (value: string): string => {
        return value?.length < 10 ? message : '';
    };
};
