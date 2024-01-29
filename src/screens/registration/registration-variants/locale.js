import { RegistrationType } from '../../../core/enums';

export default {
    screenTitle: 'Новый займ',
    optionsListTitle: 'Выберите способ регистрации',
    options: {
        [RegistrationType.ESIA]: {
            title: 'Зарегистрироваться через Госуслуги',
            hint: 'Вероятность одобрения заявки +40%'
        },
        [RegistrationType.TINKOFF]: {
            title: 'Зарегистрироваться через Тинькофф'
        },
        [RegistrationType.PASSPORT_SCAN]: {
            title: 'Зарегистрироваться через Тинькофф'
        },
        [RegistrationType.MANUAL]: {
            title: 'Заполнить анкету вручную'
        }
    }
};
