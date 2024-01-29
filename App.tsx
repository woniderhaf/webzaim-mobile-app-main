import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { IUser } from './src/core/interfaces';
import { ICalculator, RootStoreInitData } from './src/core';
import { RootStackParamList, ROUTES } from './src/navigation';
import { RootStoreProvider } from './src/store';
import {
    WebzaimApi,
    getMainCalculator,
    checkAppVersion,
    getUserProfile,
    postLogin,
    getUserCurrent
} from './src/core/api';
import {
    PIN_CODE,
    USER_TOKEN,
    UNBOARDING_SHOWN,
    USE_BIOMETRICS,
    USER_LOGIN,
    USER_PASSWORD
} from './src/core/constants';
import LocalStorage from './src/core/local-storage';

import { getSensorType } from './src/core/biometrics';
import { getUserRegistrationStep } from './src/core/utils';
import { BoxPreloader } from './src/core/ui';
import { version } from './app.json';
import Root from './src/Root';

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Lato-Regular',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    keyboardAvoiding: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

type UserData = {
    login?: string;
    token?: string;
    pwd?: string;
    pinCode?: string;
    useBiometrics?: boolean;
    user?: IUser;
};

function App() {
    const [loading, setLoading] = useState(true);
    const [appState, setAppState] = useState({});
    const [firstScreen, setFirstScreen] = useState<keyof RootStackParamList>(ROUTES.MAIN);

    useEffect(() => {
        SplashScreen.hide();
        initApp();
    }, []);

    const initApp = async () => {
        const onboardingShown = await LocalStorage.getItem(UNBOARDING_SHOWN);
        const network = await NetInfo.fetch();
        const versionStatus = await getAppVersionStatus();
        const calculator = await getCalculatorData();
        const { login, token, pwd, pinCode, user, useBiometrics } = await getUserData();
        const sensor = await getSensorType();

        const initAppState: RootStoreInitData = {
            login,
            pwd,
            token,
            pinCode,
            useBiometrics,
            onboardingShown,
            user,
            calculator,
            sensor
        };

        const initRoute = getInitialRoute(initAppState, network, versionStatus);

        setAppState(initAppState);
        setFirstScreen(initRoute);

        setLoading(false);
    };

    const getInitialRoute = (
        data: RootStoreInitData,
        network?: NetInfoState,
        versionStatus?: string
    ): keyof RootStackParamList => {
        if (!network || !network.isConnected) {
            /**
             * если нет интернета
             * на экран ошибки
             * */
            return ROUTES.ERROR;
        } else if (!data.calculator || !versionStatus) {
            /**
             * если не смогли получить данные для калькулятора кредитов
             * или не смогли проверить версию приложения
             * на экран 500 ошибки
             * */
            return ROUTES.ERROR_500;
        } else if (versionStatus === 'block') {
            /**
             * если версия приложения не прошла проверку
             * на экран принудительного обновления
             * */
            return ROUTES.UPDATE_APP;
        } else if (!data.onboardingShown) {
            /**
             * первая установка, нет данных в localstorage
             * на экран приветственный баннер
             * */
            return ROUTES.ONBOARDING;
        } else if (!data.token) {
            /**
             * если нет сохраненной сессии
             * на экран калькулятора кредита
             * */
            return ROUTES.CALCULATOR;
        } else if (data.token && !data.user) {
            /**
             * если не смогли авторизоваться
             * на экран логина
             * */
            return ROUTES.LOGIN;
        } else if (data.token && data.user) {
            /**
             * если авторизован,
             * то проболжение регистрации если не закончил
             * или пинкод
             * */
            return getUserRegistrationStep(data.user) ?? ROUTES.FAST_LOGIN;
        } else {
            /**
             * иначе на основной таб "мои кредиты"
             * */
            return ROUTES.MAIN;
        }
    };

    const getAppVersionStatus = async (): Promise<string | undefined> => {
        let versionStatus;

        try {
            const { data } = await checkAppVersion(Platform.OS, version);

            versionStatus = data && data?.current?.status;
        } catch (e) {
            // ignore
        }

        return versionStatus;
    };

    const getCalculatorData = async (): Promise<ICalculator | undefined> => {
        try {
            const { data } = await getMainCalculator();

            return data;
        } catch (e) {
            return undefined;
        }
    };

    const getUser = async (): Promise<IUser | undefined> => {
        try {
            const $user = await getUserCurrent();
            const $profile = await getUserProfile();

            if ($user.data && $profile.data) {
                return {
                    ...$user.data,
                    ...$profile.data
                };
            }

            return undefined;
        } catch (e) {
            return undefined;
        }
    };

    const getUserData = async (): Promise<UserData> => {
        let token;
        let pwd;
        let pinCode;
        let useBiometrics;
        let user;

        const login = await LocalStorage.getItem(USER_LOGIN);

        if (login) {
            const loginStoredData = await LocalStorage.getItem(login);

            if (loginStoredData) {
                token = loginStoredData[USER_TOKEN];
                pwd = loginStoredData[USER_PASSWORD];
                pinCode = loginStoredData[PIN_CODE];
                useBiometrics = loginStoredData[USE_BIOMETRICS];

                /**
                 * т.к. на бэке нет проверки сессии на валидность
                 * проверяем token через запрос профиля.
                 * так же сессия истекает довольно быстро
                 * решено сделать автологин если до этого уже логинились
                 * */
                if (token) {
                    WebzaimApi.token(token);

                    user = await getUser();

                    if (!user && pwd) {
                        try {
                            const loginResponse = await postLogin(login, pwd);

                            if (loginResponse.data) {
                                token = loginResponse.data.token;
                                WebzaimApi.token(loginResponse.data.token);

                                user = await getUser();
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                }
            }
        }

        return { login, token, pwd, pinCode, useBiometrics, user };
    };

    if (loading) {
        // @TODO show fake splash screen
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <BoxPreloader />
                </View>
            </SafeAreaView>
        );
    }

    const content = (
        <SafeAreaProvider>
            <RootStoreProvider data={appState}>
                <Root firstScreen={firstScreen} />
            </RootStoreProvider>
        </SafeAreaProvider>
    );

    return Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={'padding'}>
            {content}
        </KeyboardAvoidingView>
    ) : (
        content
    );
}

export default gestureHandlerRootHOC(App);
