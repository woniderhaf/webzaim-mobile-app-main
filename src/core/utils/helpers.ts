import { Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { IAddress, IUser, IUserAddress, IUserPassport } from '../interfaces';
import { ROUTES } from '../../navigation';

const IOS_STATUS_BAR_HEIGHT = 20;
const defaultsInsets = { top: 0, right: 0, bottom: 0, left: 0 };

const INSETS = Platform.select({
    ios: (initialWindowMetrics && initialWindowMetrics.insets) || { ...defaultsInsets, top: IOS_STATUS_BAR_HEIGHT },
    default: defaultsInsets
});

const createUserAddress = (address: IAddress): IUserAddress => {
    const { region, city, ...userAddress } = address;

    return userAddress;
};

const isEmptyPassport = (passport: IUserPassport) => {
    return !(passport.series && passport.number && passport.subunitCode && passport.birthPlace);
};

const isEmptyAddress = (address: IUserAddress) => {
    return !(address.cityKladrId || address.street);
};

const getUserRegistrationStep = (user: IUser) => {
    /**
     * не подтвержден номер телефона
     * на экран подтверждения телефона
     * */
    if (!user.isConfirmed) {
        return ROUTES.REGISTRATION_CONFIRMATION;
    }
    /**
     * не введены паспортные данные
     * на экран паспортных данных
     * */
    if (isEmptyPassport(user.passport)) {
        return ROUTES.REGISTRATION_PASSPORT;
    }
    /**
     * не указаны адреса регистрации/проживания
     * на экран добавления адресов
     * */
    if (isEmptyAddress(user.registrationAddress) || isEmptyAddress(user.residentialAddress)) {
        return ROUTES.REGISTRATION_ADDRESS;
    }
    /**
     * не указаны дополнительные данные
     * на экран дополнительных данных
     * */
    if (!user.maritalStatus || !user.education || !user.income) {
        return ROUTES.REGISTRATION_ADDITIONAL_DATA;
    }

    return undefined;
};

const getAge = (birthDayTimeStamp: number, currentTimeStamp?: number) => {
    const today = (currentTimeStamp && new Date(currentTimeStamp)) || new Date();
    const birthDate = new Date(birthDayTimeStamp);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

export { INSETS, createUserAddress, isEmptyAddress, isEmptyPassport, getUserRegistrationStep, getAge };
