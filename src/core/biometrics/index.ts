import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

export const isSensorAvailable = async (): Promise<boolean> => {
    try {
        const { available } = await rnBiometrics.isSensorAvailable();

        return available;
    } catch (e) {
        return false;
    }
};

export const getSensorType = async (): Promise<BiometryType | undefined> => {
    try {
        const { biometryType } = await rnBiometrics.isSensorAvailable();

        return biometryType;
    } catch (e) {
        return undefined;
    }
};

export const authWithBiometrics = async (): Promise<boolean> => {
    try {
        const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Вход' });

        return success;
    } catch (e) {
        return false;
    }
};

