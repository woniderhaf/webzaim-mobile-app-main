import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { ILoanProlongationResponse, IPaymentMethod } from '../../../../core';
import { getCurrentLoanPaymentMethods } from '../../../../core/api';
import { IPaymentMethodType } from '../../../../core/enums';
import { amountFormat } from '../../../../core/utils';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { ButtonList, ErrorMessage } from '../../../../core/ui';
import styles from './styles';

const LoanPaymentMethodScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_PAYMENT_METHOD>['navigation']>();
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_PAYMENT_METHOD>['route']>();
    const [loading, setLoading] = useState(false);
    const [paymentMethods, setSaymentMethods] = useState<ILoanProlongationResponse>();
    const [error, setError] = useState(false);

    const { sum = 0, includeAddons = true } = route.params || {};

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);

            try {
                const { data } = await getCurrentLoanPaymentMethods(sum, includeAddons);

                if (data) {
                    setSaymentMethods(data);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const onSelect = (method: IPaymentMethod) => {
        let url = method.paymentFormRequest || method.paymentServiceEndpointRequest || '';

        url += `${url.includes('?') ? '&' : '?'}amount=${sum}`;

        if (method.type === IPaymentMethodType.POST || method.type === IPaymentMethodType.BANK) {
            navigation.navigate(ROUTES.DOCUMENT, { url, full: true, share: true });
        } else {
            navigation.navigate(ROUTES.PAYMENT, { url });
        }
    };

    const getPaymentSum = (method: IPaymentMethod): number => {
        const { commission = 0, commissionFreeThreshold } = method;

        let totalSum = Number(sum);

        if (method.type === IPaymentMethodType.CARD) {
            if (commissionFreeThreshold === 0 || (commissionFreeThreshold && sum > commissionFreeThreshold)) {
                totalSum += commission;
            }
        } else {
            totalSum += commission;
        }

        return totalSum;
    };

    const renderPaymentSum = (method: IPaymentMethod) => {
        const { type, bankCommissionPercent } = method;

        if (type === IPaymentMethodType.CARD) {
            return (
                <>
                    <Text style={styles.paymentSum} numberOfLines={1}>
                        {amountFormat(getPaymentSum(method), true)}
                    </Text>
                    <Text style={styles.buttonSubtitle}>{`+${bankCommissionPercent}% комиссия банка`}</Text>
                </>
            );
        }

        return (
            <Text style={styles.paymentSum} numberOfLines={1}>
                {amountFormat(sum, true)}
            </Text>
        );
    };

    const renderMethods = () => {
        const { methods } = paymentMethods || {};

        if (!methods || !methods.length) {
            return null;
        }

        return methods.map((method, index) => {
            return (
                <View key={method.type} style={{ marginTop: index > 0 ? 16 : 0 }}>
                    <ButtonList onPress={() => onSelect(method)}>
                        <View style={styles.button}>
                            {method.title.length > 0 && (
                                <Text style={styles.buttonTitle} numberOfLines={1}>
                                    {`${method.title}`}
                                </Text>
                            )}
                            {renderPaymentSum(method)}
                            {method.description.length > 0 && (
                                <Text style={styles.buttonSubtitle}>{`${method.description}`}</Text>
                            )}
                        </View>
                    </ButtonList>
                </View>
            );
        });
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: 'Способы оплаты',
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>{error ? <ErrorMessage message={GLOBAL_ERROR_TEXT} /> : renderMethods()}</View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanPaymentMethodScreen);
