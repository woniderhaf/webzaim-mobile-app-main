import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { WebzaimApi } from '../../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { ErrorMessage } from '../../../../core/ui';
import analytics from '../../../../core/analytics';
import { useCommonStore } from '../../../../store';
import locale from './locale';
import styles from './styles';

const SUCCESS_URL = '/client/callback/success';
const FAIL_URL = '/client/callback/error';

// @TODO объединить с LOAN_REQUEST_ADD_CARD

const UserMoneyTransferAddCardScreen = () => {
    const { setIsNeedUpdateMethodPaymentList } = useCommonStore();
    const navigation = useNavigation<ProfileScreenProps<ROUTES.USER_MONEY_TRANSFER_ADD_CARD>['navigation']>();
    const { params } = useRoute<ProfileScreenProps<ROUTES.USER_MONEY_TRANSFER_ADD_CARD>['route']>();
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
        setError(false);
        setLoading(true);

        try {
            const { endpoint } = params;
            const { data } = await WebzaimApi.customRequest('GET', endpoint.replace('/api', ''));

            if (data) {
                let $form = `
                    <!DOCTYPE html>
                    <html lang="ru">
                        <head>
                        <meta charset="UTF-8">
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
                                    .map(
                                        (param: { name: any; value: any }) =>
                                            `<input type="hidden" name="${param.name}" value="${param.value}" />`
                                    )
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
            if (success) {
                analytics.sendEvent('PaymentTransferSuccess');
            }
            setIsNeedUpdateMethodPaymentList(true);
            navigation.pop(2);
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
            <View style={[styles.container]}>
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

export default observer(UserMoneyTransferAddCardScreen);
