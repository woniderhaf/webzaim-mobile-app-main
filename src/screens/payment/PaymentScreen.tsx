import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../core/layouts/main-layout';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { useUIStore } from '../../store';
import { WebzaimApi } from '../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../core/constants';
import { ErrorMessage } from '../../core/ui';
import styles from './styles';
import locale from './locale';

const SUCCESS_URL = '/client/callback/success';
const FAIL_URL = '/client/callback/error';

const PaymentScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.PAYMENT>['navigation']>();
    const { params } = useRoute<RootStackScreenProps<ROUTES.PAYMENT>['route']>();
    const { setModal } = useUIStore();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [form, setForm] = useState('');
    const [error, setError] = useState(false);
    const webview = useRef<WebView>(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        if (!params.url) {
            return;
        }

        setError(false);
        setLoading(true);

        try {
            const { data } = await WebzaimApi.customRequest('GET', params.url.replace('/api', ''));

            if (data) {
                let $form = `
                    <!DOCTYPE html>
                    <html lang="ru">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>Банковская карта</title>
                        <style>
                            html
                            {
                                backgroudn: '#fff';
                            }
                        </style>
                        </head>
                        <body>
                            <form method="${data.method}" action="${data.url}" id="cardForm">
                                ${data.params
                                    .map((param: { name: any; value: any; }) => `<input type="hidden" name="${param.name}" value="${param.value}" />`)
                                    .join('')}
                            </form>
                            <script>
                                window.onload = () => {
                                    const form = document.getElementById('cardForm');

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
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const onNavigationStateChange = (nextState: WebViewNavigation) => {
        const success = nextState.url.includes(SUCCESS_URL);
        const fail = nextState.url.includes(FAIL_URL);

        if (success || fail) {
            const locales = success ? locale.successModal : locale.failModal;

            setModal({
                title: locales.title,
                buttons: [
                    {
                        label: locales.button,
                        onPress: () => {
                            setModal(null);
                            navigation.replace(
                                ROUTES.MAIN,
                                {
                                    screen: ROUTES.LOANS_STACK,
                                    params: {
                                        screen: ROUTES.USER_LOANS
                                    }
                                }
                            );
                        }
                    }
                ]
            });
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
                    />
                )}
            </View>
        </MainLayout>
    );
};

export default observer(PaymentScreen);
