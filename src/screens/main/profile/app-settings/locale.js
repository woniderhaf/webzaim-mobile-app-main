import { BiometryTypes } from 'react-native-biometrics';

export default {
    screenTitle: 'Настройки приложения',
    settings: {
        push: 'Получать push-уведомления',
        sms: 'Получать sms-уведомления',
        [BiometryTypes.TouchID]: 'Вход по отпечатку пальца',
        [BiometryTypes.FaceID]: 'Вход с помощью Face ID',
        [BiometryTypes.Biometrics]: 'Вход c использованием биометрии',
        pincode: 'Изменить пин-код'
    },
    save: 'Сохранить'
};
