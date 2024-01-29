import { PROFILE_FORM } from '../../../enums';

export default {
    surname: 'Фамилия',
    name: 'Имя',
    patronymic: 'Отчество',
    birthDate: 'Дата рождения',
    phoneNumber: 'Мобильный телефон',
    additionalPhoneNumber: 'Дополнительный телефон',
    email: 'Email',
    passport: {
        series: 'Серия и номер паспорта',
        issuer: 'Кем выдан',
        issueDate: 'Дата выдачи',
        subunitCode: 'Код подразделения',
        birthPlace: 'Место рождения'
    },
    [PROFILE_FORM.ADDRESS_REG_REGION]: 'Область / край',
    [PROFILE_FORM.ADDRESS_REG_CITY]: 'Город / поселение',
    [PROFILE_FORM.ADDRESS_REG_STREET]: 'Улица',
    [PROFILE_FORM.ADDRESS_REG_HOUSE]: 'Дом',
    [PROFILE_FORM.ADDRESS_RES_FLAT]: 'Квартира',
    [PROFILE_FORM.ADDRESS_RES_REGION]: 'Область / край',
    [PROFILE_FORM.ADDRESS_RES_CITY]: 'Город / поселение',
    [PROFILE_FORM.ADDRESS_RES_STREET]: 'Улица',
    [PROFILE_FORM.ADDRESS_RES_HOUSE]: 'Дом',
    [PROFILE_FORM.ADDRESS_RES_FLAT]: 'Квартира',
    maritalStatus: 'Семейное положение',
    education: 'Образование',
    income: 'Месячный доход, руб.',
    canEditData: '',
    canEditPassportData: '',
    requirePassportScans: '',
    passportScans: '',
    userAddressesIsEqual: 'Адрес проживания совпадает с местом регистрации'
} as Record<any, any>;
