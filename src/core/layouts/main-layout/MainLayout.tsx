import React, { useEffect, useMemo } from 'react';
import { Keyboard, StatusBar, View } from 'react-native';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuthStore, useUIStore } from '../../../store';
import { FastLoginActions } from '../../enums';
import { MainLayoutProps } from '../../index';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { BoxPreloader } from '../../ui';
import Header from '../header';
import styles from './styles';

/**
 *  экраны на которых не надо проверять пинкод и прочее, глобальная ошибка, отсутствие интернета и тд и тп
 */
const EXCEPTIONS_SCREENS = [
    ROUTES.ERROR,
    ROUTES.ERROR_500,
    ROUTES.CALCULATOR,
    ROUTES.LOGIN,
    ROUTES.FAST_LOGIN,
    ROUTES.RECOVER_LOGIN,
    ROUTES.REGISTRATION,
    ROUTES.REGISTRATION_CONFIRMATION,
    ROUTES.REGISTRATION_VARIANTS,
    ROUTES.REGISTRATION_DOCUMENTS,
    ROUTES.REGISTRATION_ADDRESS,
    ROUTES.REGISTRATION_ADDITIONAL_DATA,
    ROUTES.REGISTRATION_PASSPORT,
    ROUTES.REGISTRATION_MONEY_TRANSFER_ADD,
    ROUTES.REGISTRATION_MONEY_TRANSFER,
    ROUTES.REGISTRATION_LOAN_REQUEST,
    ROUTES.REGISTRATION_EXTERNAL,
    ROUTES.UPDATE_APP,
    ROUTES.DOCUMENT
];

const MainLayout = ({ children, contrast, edges, header, theme = 'white', loading }: MainLayoutProps) => {
    const store = useAuthStore();
    const UIStore = useUIStore();
    const navigation = useNavigation<RootStackScreenProps<any>['navigation']>();
    const route = useRoute<RootStackScreenProps<any>['route']>();
    const $edges = edges ?? ['top'];
    const barStyle = theme === 'blue' ? 'light-content' : 'dark-content';

    useEffect(() => {
        Keyboard.dismiss();
    }, []);

    useEffect(() => {
        /**
         * Если пора вводить пинкод
         * (приложение было свертнуто более {APP_BACKGROUND_TIME} секунд)
         * то редиректим на ввод пинкода
         */
        if (store.pincodeRequire && store.token && store.pinCode && !EXCEPTIONS_SCREENS.includes(route.name)) {
            navigation.navigate(ROUTES.FAST_LOGIN, {
                backUrl: ROUTES.MAIN,
                action: FastLoginActions.ENTER,
                validateSession: true
            });
        }

        const beforeRemover = (e: { preventDefault: () => void }) => {
            /**
             * Проба полечить проблему высоты экранов
             * при редиректе с открытой клавиатуров
             * (не помогло но пусть скрывается на всякий случай)
             */
            Keyboard.dismiss();
            /**
             * Когда принудительно требуем авторизацию
             * то блокирует нативную кнопку назад
             */
            if (store.pincodeRequire && !EXCEPTIONS_SCREENS.includes(route.name)) {
                e.preventDefault();
            }
        };

        navigation.addListener('beforeRemove', beforeRemover);

        return () => {
            navigation.removeListener('beforeRemove', beforeRemover);
        };
    }, [store.pincodeRequire]);

    const statusBarBg = useMemo(() => {
        switch (theme) {
            case 'gray':
                return '#E5E5E5';
            case 'blue':
                return '#276DCC';
            case 'white':
            default:
                return '#fff';
        }
    }, [theme]);

    return (
        <SafeAreaView edges={$edges} style={[styles.safeArea, styles[theme]]}>
            <StatusBar barStyle={barStyle} backgroundColor={statusBarBg} />
            {header && <Header {...header} contrast={contrast} />}
            {children}
            {Boolean(loading || UIStore.loading) && (
                <View style={styles.overlay}>
                    <View style={styles.loaderContainer}>
                        <BoxPreloader />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default observer(MainLayout);
