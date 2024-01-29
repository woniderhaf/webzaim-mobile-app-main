import React, { useMemo, useRef } from 'react';
import { observer } from 'mobx-react';
import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import OnboardingScreen from '../screens/onboarding';
import ErrorScreen from '../screens/error';
import MainScreen from '../screens/main/Main';
import CalculatorScreen from '../screens/calculator';
import FastLoginScreen from '../screens/auth/fast-login';
import LoginScreen from '../screens/auth/login';
import RecoverScreen from '../screens/auth/recover';
import WelcomeScreen from '../screens/auth/welcome';
import RegistrationScreen from '../screens/registration/registration';
import Error500Screen from '../screens/500';
import DocumentScreen from '../screens/document';
import PaymentScreen from '../screens/payment';
import ChangePasswordScreen from '../screens/auth/change-password';
import LogScreen from '../screens/log';
import ArticleScreen from '../screens/article';
import SmsConfirmation from '../screens/sms-confirmation';
import LoanProlongationConfirmScreen from '../screens/main/loans/loan-prolongation-confirm';
import UpdateAppScreen from '../screens/update-app';
import UnderConstructionScreen from '../screens/under-construction';
import { FeedbackBottomSheetModal } from '../core/components';
import { useAuthStore, useRegistrationStore } from '../store';
import RegistrationVariantsScreen from '../screens/registration/registration-variants/RegistrationVariantsScreen';
import RegistrationDocumentsScreen from '../screens/registration/registration-documents/RegistrationDocuments';
import RegistrationConfirmationScreen from '../screens/registration/registration-confirmation/RegistrationConfirmationScreen';
import RegistrationPassportScreen from '../screens/registration/registration-passport/RegistrationPassportScreen';
import RegistrationAddressScreen from '../screens/registration/registration-address/RegistrationAddress';
import RegistrationAdditionalDataScreen from '../screens/registration/registration-additional-data/RegistrationAdditionalData';
import RegistrationLoanRequestScreen from '../screens/registration/registration-loan-request/RegistrationLoanRequest';
import RegistrationMoneyTransferScreen from '../screens/registration/registration-money-transfer/RegistrationMoneyTransfer';
import LoanRequestMoneyTransferAddScreen from '../screens/main/loans/loan-request-money-transfer-add/LoanRequestMoneyTransferAddScreen';
import RegistrationExternalScreen from '../screens/registration/registration-external';
import { FastLoginActions } from '../core/enums';
import loanAddonDescription from '../screens/main/loans/loan-addon-description/LoanAddonDescriptionScreen';
import LoanRequestDocumentsScreen from '../screens/main/loans/loan-request-documents/LoanRequestDocumentsScreen';
import LoanRequestAddCardScreen from '../screens/main/loans/loan-request-add-card';
import { ROUTES } from './routes';
import { RootStackParamList } from './types';
import { navigationRef } from '.';

export type NavigationProps = {
    firstScreen: keyof RootStackParamList;
    onNavigationReady: () => any;
    onNavigationStateChange: (prevRoute: string, nextRoute: string) => any;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = (props: NavigationProps) => {
    const { steps } = useRegistrationStore();
    const { pinCode } = useAuthStore();
    const currentRoute = useRef<string>('');

    const NavProps: NavigationContainerProps = useMemo(() => {
        const initState: NavigationContainerProps = {
            children: undefined
        };

        if (props.firstScreen === ROUTES.LOGIN) {
            initState.initialState = {
                routes: [{ name: ROUTES.CALCULATOR }, { name: ROUTES.LOGIN }]
            };
        } else if (steps[props.firstScreen]) {
            /**
             * если регистрация не закончена
             * переключаемся на стэк регистрации
             * */
            initState.initialState = {
                routes: [{ name: ROUTES.CALCULATOR }]
            };

            for (const key in steps) {
                if (key === props.firstScreen) {
                    /**
                     * если регистрация уже подтверждена,
                     * но на этапе создания пинкода была прервана
                     * */
                    if (steps[key].step >= 2 && !pinCode) {
                        initState.initialState.routes.push({
                            name: ROUTES.FAST_LOGIN,
                            params: {
                                validateSession: false,
                                action: FastLoginActions.CREATE,
                                backUrl: key
                            }
                        });
                    } else {
                        initState.initialState.routes.push({ name: key as ROUTES });
                    }

                    break;
                }

                initState.initialState.routes.push({ name: key as ROUTES });
            }
        }

        return initState;
    }, []);

    const onNavigationReady = () => {
        currentRoute.current = navigationRef.current?.getCurrentRoute()?.name || '';
    };

    const onNavigationStateChange = async () => {
        const prevRoute = currentRoute.current;
        const nextRoute = navigationRef.current?.getCurrentRoute()?.name || prevRoute;

        if (prevRoute !== nextRoute) {
            props.onNavigationStateChange(prevRoute, nextRoute);
            currentRoute.current = nextRoute;
        }
    };

    return (
        <BottomSheetModalProvider>
            <NavigationContainer
                {...NavProps}
                ref={navigationRef}
                onStateChange={onNavigationStateChange}
                onReady={onNavigationReady}
            >
                <RootStack.Navigator
                    screenOptions={{ headerShown: false, gestureEnabled: false }}
                    initialRouteName={props.firstScreen}
                >
                    <RootStack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
                    <RootStack.Screen name={ROUTES.RECOVER_LOGIN} component={RecoverScreen} />
                    <RootStack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePasswordScreen} />
                    <RootStack.Screen name={ROUTES.FAST_LOGIN} component={FastLoginScreen} />
                    <RootStack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
                    <RootStack.Screen name={ROUTES.MAIN} component={MainScreen} />
                    <RootStack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
                    <RootStack.Screen name={ROUTES.ERROR} component={ErrorScreen} />
                    <RootStack.Screen name={ROUTES.ERROR_500} component={Error500Screen} />
                    <RootStack.Screen name={ROUTES.UPDATE_APP} component={UpdateAppScreen} />
                    <RootStack.Screen name={ROUTES.CALCULATOR} component={CalculatorScreen} />
                    <RootStack.Screen name={ROUTES.UNDER_CONSTRUCTION} component={UnderConstructionScreen} />
                    <RootStack.Group screenOptions={{ presentation: 'card' }}>
                        <RootStack.Screen name={ROUTES.DOCUMENT} component={DocumentScreen} />
                        <RootStack.Screen name={ROUTES.PAYMENT} component={PaymentScreen} />
                        <RootStack.Screen name={ROUTES.ARTICLE} component={ArticleScreen} />
                        <RootStack.Screen name={ROUTES.LOAN_REQUEST_ADD_CARD} component={LoanRequestAddCardScreen} />
                        <RootStack.Screen name={ROUTES.SMS_CONFIRMATION} component={SmsConfirmation} />
                        <RootStack.Screen
                            name={ROUTES.LOAN_PROLONGATION_CONFIRM}
                            component={LoanProlongationConfirmScreen}
                        />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'card' }}>
                        <RootStack.Screen name={ROUTES.LOG} component={LogScreen} />
                    </RootStack.Group>
                    <RootStack.Screen name={ROUTES.REGISTRATION_VARIANTS} component={RegistrationVariantsScreen} />
                    <RootStack.Screen name={ROUTES.REGISTRATION} component={RegistrationScreen} />
                    <RootStack.Screen name={ROUTES.REGISTRATION_DOCUMENTS} component={RegistrationDocumentsScreen} />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_CONFIRMATION}
                        component={RegistrationConfirmationScreen}
                    />
                    <RootStack.Screen name={ROUTES.REGISTRATION_PASSPORT} component={RegistrationPassportScreen} />
                    <RootStack.Screen name={ROUTES.REGISTRATION_ADDRESS} component={RegistrationAddressScreen} />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_ADDITIONAL_DATA}
                        component={RegistrationAdditionalDataScreen}
                    />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_LOAN_REQUEST}
                        component={RegistrationLoanRequestScreen}
                    />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_MONEY_TRANSFER}
                        component={RegistrationMoneyTransferScreen}
                    />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_MONEY_TRANSFER_ADD}
                        component={LoanRequestMoneyTransferAddScreen}
                    />
                    <RootStack.Screen
                        name={ROUTES.REGISTRATION_REQUEST_DOCUMENTS}
                        component={LoanRequestDocumentsScreen}
                    />
                    <RootStack.Screen name={ROUTES.REGISTRATION_EXTERNAL} component={RegistrationExternalScreen} />
                    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                        <RootStack.Screen name={ROUTES.LOAN_ADDON_DESCRIPTION} component={loanAddonDescription} />
                    </RootStack.Group>
                </RootStack.Navigator>
                <FeedbackBottomSheetModal />
            </NavigationContainer>
        </BottomSheetModalProvider>
    );
};

export default observer(Navigation);
