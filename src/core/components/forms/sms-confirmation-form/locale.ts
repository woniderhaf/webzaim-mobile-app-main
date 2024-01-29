import { SmsConfirmationTypes } from '../../../enums';

export default {
    title: {
        [SmsConfirmationTypes.REQUEST]: 'Ноый займ',
        [SmsConfirmationTypes.PROLONGATION]: 'Продление займа'
    },
    document: 'Договор-оферта',
    number: 'На номер ',
    shortCode: 'отправлено SMS с кодом из 4 цифр.',
    lognCode: 'отправлено SMS с двумя кодами из 3-х цифр',
    enterText: 'Введите полученный код в поле',
    formTitle: {
        [SmsConfirmationTypes.REQUEST]: 'Подтверждение заявки',
        [SmsConfirmationTypes.PROLONGATION]: 'Подтверждение продления',
        [SmsConfirmationTypes.REGISTRATION]: 'Создание аккаунта'
    },
    form: {
        code: 'Код подтверждения',
        submit: 'Подтвердить',
        cancel: 'Отменить заявку',
        changePhone: 'Изменить номер телефона'
    },
    successAlert: {
        title: 'Заявка отправлена',
        text: 'Ваша заявка будет рассмотрена в течение 15 минут',
        ok: 'Ок'
    },
    cancelAlert: {
        title: 'Вы уверены, что хотите отменить заявку на займ?',
        ok: 'Продолжить оформление',
        cancel: 'Отменить заявку'
    },
    shortcut: 'Договор-оферта действует 5 дней. Если Вы обнаружили ошибку в анкетных данных, Вам следует отменить заявку, после чего исправить ошибку в анкете, затем оформить заявку повторно. Компания вправе выдать сумму займа в размере ниже, чем заявленная'
};
