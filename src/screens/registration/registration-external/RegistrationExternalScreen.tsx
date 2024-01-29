import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { WebzaimApi } from '../../../core/api';
import { ErrorMessage } from '../../../core/ui';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import { useUserStore } from '../../../store';
import locale from './locale';
import styles from './styles';

const SUCCESS_URL = '/client/callback/success';
const FAIL_URL = '/client/callback/error';

const RegistrationExternalScreen = () => {
    const userStore = useUserStore();
    const insets = useSafeAreaInsets();
    const route = useRoute<RootStackScreenProps<ROUTES.REGISTRATION_EXTERNAL>['route']>();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_EXTERNAL>['navigation']>();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [form, setForm] = useState('');
    const [error, setError] = useState(false);
    const webview = useRef<WebView>(null);

    const { endpoint = '' } = route.params || {};

    useEffect(() => {
        (async () => {
            const isExternal = await getExternalUser();

            if (!isExternal) {
                await fetchData();
            }
        })();
    }, []);

    const fetchData = async () => {
        setError(false);
        setLoading(true);

        try {
            const { data, message, status, errors, meta } = await WebzaimApi.customRequest(
                'GET',
                endpoint.replace('/api', '')
            );

            console.log(data, message, status, errors, meta, endpoint, 'RESPONSE');
            if (data) {
                const fields = data.params
                    .map(
                        (param: { name: any; value: any }) =>
                            `<input type="hidden" name="${param.name}" value="${param.value}" />`
                    )
                    .join('');

                let $form = `
                    <!DOCTYPE html>
                    <html lang="ru">
                        <head>
                        <meta charset="UTF-8">
                        <title>Регистрация</title>
                        <style>
                            html, body
                            {
                                background: '#fff';
                            }
                        </style>
                        </head>
                        <body>
                            <form method="${data.method}" action="${data.url}" id="authForm">
                                ${fields}
                            </form>
                            <script>
                                window.onload = () => {
                                    const form = document.getElementById('authForm');

                                    if (form) {
                                        form.submit();
                                    }
                                }
                            </script>
                        </body>
                    </html>
                `;

                setForm($form);
                setUrl(data.url);
            } else {
                console.log('tut');
                setError(true);
            }
        } catch (err) {
            console.log(error, 'Error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getExternalUser = async () => {
        try {
            setLoading(true);
            await userStore.getExternalUser();
            navigation.replace(ROUTES.REGISTRATION);

            return true;
        } catch (e) {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const onNavigationStateChange = async (nextState: WebViewNavigation) => {
        const success = nextState.url.includes(SUCCESS_URL);
        const fail = nextState.url.includes(FAIL_URL);

        switch (true) {
            case success: {
                webview.current?.stopLoading();
                await getExternalUser();
                break;
            }
            case fail:
                navigation.goBack();
        }
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                {error && (
                    <View style={styles.errorContainer}>
                        <ErrorMessage message={GLOBAL_ERROR_TEXT} />
                    </View>
                )}
                {Boolean(!error && form) && (
                    <WebView
                        ref={webview}
                        scrollEnabled
                        nestedScrollEnabled
                        onNavigationStateChange={onNavigationStateChange}
                        onError={() => setError(true)}
                        source={{ html: form, baseUrl: url }}
                        sharedCookiesEnabled
                    />
                )}
            </View>
        </MainLayout>
    );
};

export default observer(RegistrationExternalScreen);
