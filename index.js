import { AppRegistry, AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { createElement, useEffect, useState } from 'react';
import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (message) => {
    // @TODO background push message
    // const { data = {}, messageId } = message || {};
});

function HeadlessCheck({ isHeadless }) {
    const [visible, setVisible] = useState(AppState.currentState === 'active');

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (isHeadless && !visible && nextAppState === 'active') {
                setVisible(true);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [isHeadless, visible]);

    return (isHeadless && !visible) ? null : createElement(App);
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
