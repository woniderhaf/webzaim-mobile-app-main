import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { WebzaimApi } from '../../../../core/api';
import { ErrorMessage } from '../../../../core/ui';
import { useCommonStore } from '../../../../store';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import locale from './locale';
import styles from './styles';

const SUCCESS_URL = '/client/callback/success';
const FAIL_URL = '/client/callback/error';

const LoanRequestAddCardScreen = () => {
    const { setIsNeedUpdateMethodPaymentList } = useCommonStore();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_REQUEST_ADD_CARD>['navigation']>();
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_REQUEST_ADD_CARD>['route']>();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [form, setForm] = useState('');
    const [error, setError] = useState(false);
    const webview = useRef<WebView>(null);

    const { endpoint = '' } = route.params || {};

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        setError(false);
        setLoading(true);

        try {
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
            setIsNeedUpdateMethodPaymentList(true);
            console.log(navigation.getState());
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

export default observer(LoanRequestAddCardScreen);
