import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { observer } from 'mobx-react';
import NetInfo from '@react-native-community/netinfo';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { useAuthStore, useRootStore, useUIStore } from './store';
import { navigationRef, ROUTES, RootStackParamList } from './navigation';
import Navigation from './navigation/Navigation';
import { getCheckSession, WebzaimApi } from './core/api';
import { APP_BACKGROUND_TIME } from './core/constants';
import analytics from './core/analytics';
import Modal from './core/ui/modal';

export type RootProps = {
    firstScreen: keyof RootStackParamList;
};

const Root = ({ firstScreen }: RootProps) => {
    const store = useRootStore();
    const authStore = useAuthStore();
    const { modal, setLoading } = useUIStore();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        analytics.init();

        WebzaimApi.setAuthRequiredCallback(() => {
            authStore.requestPincode(true);
        });

        const onAppStateChangeSubscription = AppState.addEventListener('change', onAppStateChange);

        requestUserPushPermission();

        const onMessageChangeSubscription = messaging().onMessage(onPushNotification);

        return () => {
            onAppStateChangeSubscription.remove();
            onMessageChangeSubscription();
        };
    }, []);

    const onAppStateChange = async (nextAppState: AppStateStatus) => {
        const isWakeUp = appState.current.match(/inactive|background/) && nextAppState === 'active';
        const isSleep = appState.current === 'active' && nextAppState.match(/inactive|background/);

        if (isWakeUp) {
            const timeDiff = Math.abs(differenceInSeconds(store.backgroundTime, Date.now()));

            if (timeDiff >= APP_BACKGROUND_TIME) {
                setLoading(true);

                try {
                    const network = await NetInfo.fetch();

                    if (!network || !network.isConnected) {
                        navigationRef.current?.navigate(ROUTES.ERROR);

                        return;
                    }

                    if (authStore.token) {
                        const { data } = await getCheckSession();

                        if (data) {
                            authStore.requestPincode(true);
                        }
                    }
                } finally {
                    setLoading(false);
                }
            }
        }

        if (isSleep) {
            store.updateBackgroundTime(Date.now());
        }

        appState.current = nextAppState;
        store.changeAppState(appState.current);
    };

    const onPushNotification = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // @TODO show notification in app
    };

    const requestUserPushPermission = async () => {
        // @TODO check permission and get device token and send to backend

        try {
            const authStatus = await messaging().requestPermission({ provisional: true });

            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                // const deviceToken = await messaging().getToken();
                // store.setDeviceToken(deviceToken);
                // console.log('DEVICE TOKEN: ', Platform.OS, deviceToken);
            }
        } catch (error) {
            // console.log('requestUserPushPermission error: ', error);
        }
    };

    const onNavigationReady = () => {
        // @TODO deeplink
    };

    const onNavigationStateChange = async (prevRoute: string, nextRoute: string) => {
        if (prevRoute !== nextRoute) {
            analytics.trackScreen(nextRoute);
        }
    };

    return (
        <>
            <Navigation
                firstScreen={firstScreen}
                onNavigationReady={onNavigationReady}
                onNavigationStateChange={onNavigationStateChange}
            />
            {modal && <Modal {...modal} />}
        </>
    );
};

export default observer(Root);
