import { passportIssueDateValidator } from '../../src/core/utils';

enum ResultList {
    GENERAL = 'Проверте даты рождения и выдачи паспорта',
    DATE = 'Неверная дата',
    EXPIRED = 'Паспорт просрочен',
    VALID = ''
}

const mockList = [
    // Дата рождения 1995 года 1 июля человеку 28 лет на 2023 год
    // Дата паспорта раньше даты рождения
    { birthDay: 804593913, issueDateToMS: new Date(173447720), result: ResultList.GENERAL },
    // Паспорт до 14 лет
    { birthDay: 804593913, issueDateToMS: new Date(1120018920000), result: ResultList.GENERAL },
    // Паспорт в 15 лет
    { birthDay: 804593913, issueDateToMS: new Date(1277985320000), result: ResultList.EXPIRED },
    // Паспорт в 20 лет
    { birthDay: 804593913, issueDateToMS: new Date(1437646713000), result: ResultList.VALID },
    // Паспорт в 21 год
    { birthDay: 804593913, issueDateToMS: new Date(1467374120000), result: ResultList.VALID },
    // Паспорт выдан в 2025 году
    { birthDay: 804593913, issueDateToMS: new Date(1751370920000), result: ResultList.DATE },

    //Дата рождения 1975 года 1 июля человеку 48 лет на 2023 год
    // Паспорт в 45
    { birthDay: 173447720, issueDateToMS: new Date(1593604520000), result: ResultList.VALID },
    // Паспорт в 44
    { birthDay: 173447720, issueDateToMS: new Date(1561982120000), result: ResultList.EXPIRED },
    // Паспорт в 46
    { birthDay: 173447720, issueDateToMS: new Date(1625140520000), result: ResultList.VALID },

    // Дата рождения 1 декабря 2000 человеку 23 года
    // Паспорт в 20 лет
    { birthDay: 975671720, issueDateToMS: new Date(1606823720000), result: ResultList.VALID },
    // Пограничная дата получения паспорта с текущей датой
    // Дата рождения 4 декабря 2003 человеку 20 лет
    { birthDay: 1070496000, issueDateToMS: new Date(1701648000000), result: ResultList.VALID },
    // Дата рождения 20 августа 2004 человеку 19 лет
    { birthDay: 1092956842, issueDateToMS: new Date(1534460842000), result: ResultList.GENERAL },
    { birthDay: 844294042, issueDateToMS: new Date(1475017642000), result: ResultList.EXPIRED },
    { birthDay: 1092956842, issueDateToMS: new Date(1534460842), result: ResultList.GENERAL }
];

describe.each(mockList)('%#', ({ birthDay, issueDateToMS, result }) => {
    const birthday = new Date(birthDay * 1000);
    const age = new Date().getFullYear() - birthday.getFullYear();

    console.log('birthDay ' + birthDay);
    console.log('Возраст: ' + age);
    console.log('Дата выдачи паспорта: ', issueDateToMS);
    test(`${issueDateToMS}`, () => {
        expect(passportIssueDateValidator(birthDay)(issueDateToMS)).toBe(result);
    });
});
