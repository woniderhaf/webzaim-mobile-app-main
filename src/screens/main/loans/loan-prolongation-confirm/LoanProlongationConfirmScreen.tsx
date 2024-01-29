import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useUIStore } from '../../../../store';
import { ILoanProlongationConfirm, IPaymentMethod } from '../../../../core';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { getCurrenLoanProlongConfirm, getCurrenLoanProlongPaymentMethods, postCurrenLoanProlongConfirmCheck } from '../../../../core/api';
import { IPaymentMethodType, SmsConfirmationTypes } from '../../../../core/enums';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { SmsConfirmationForm } from '../../../../core/components';
import locale from './locale';

const LoanProlongationConfirmScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_PROLONGATION_CONFIRM>['navigation']>();
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_PROLONGATION_CONFIRM>['route']>();
    const { loading, setLoading } = useUIStore();
    const [confirm, setConfirm] = useState<ILoanProlongationConfirm>();
    const [inProcess, setInprocess] = useState(false);
    const [error, setError] = useState('');

    const { period, amount } = route.params || {};

    useEffect(() => {
        fetConfirm();
    }, []);

    const fetConfirm = async () => {
        setLoading(true);

        try {
            const { data } = await getCurrenLoanProlongConfirm(period);

            if (data) {
                setConfirm(data);
            } else {
                setError(GLOBAL_ERROR_TEXT);
            }
        } catch {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const checkCode = async (code: string) => {
        setInprocess(true);

        try {
            const { data, errors, status } = await postCurrenLoanProlongConfirmCheck({
                periodDays: period,
                code
            });

            if (data || status === 200) {
                const paymentMethods = await getCurrenLoanProlongPaymentMethods(period);

                if (paymentMethods.data && paymentMethods.data.methods) {
                    /**
                     * для продления только оплата картой
                     */
                    const cardMethod: IPaymentMethod = paymentMethods.data.methods
                        .find((method: IPaymentMethod) => method.type === IPaymentMethodType.CARD)
                        || paymentMethods.data.methods[0];

                    const { paymentServiceEndpointRequest } = cardMethod;

                    if (paymentServiceEndpointRequest) {
                        let url = paymentServiceEndpointRequest + `&periodDays=${period}&amount=${amount}`;

                        navigation.navigate(ROUTES.PAYMENT, { url });
                    } else {
                        setError(GLOBAL_ERROR_TEXT);
                    }
                } else {
                    setError(GLOBAL_ERROR_TEXT);
                }

            } else if (errors) {
                const err = errors?.confirmation_code.join(' ') || locale.error;

                setError(err);
            }
        } catch {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setInprocess(false);
        }
    };

    const onOfferDocument = () => {
        const url = confirm?.offerDocumentDownloadHref || '';

        navigation.navigate(ROUTES.DOCUMENT, { url, full: true });
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading || inProcess}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                <>
                    {!loading && confirm && (
                        <SmsConfirmationForm
                            disabled={inProcess}
                            type={SmsConfirmationTypes.PROLONGATION}
                            error={error}
                            phone={confirm.clientPhoneNumber}
                            doubleCode={confirm.doubleCode}
                            onSubmit={checkCode}
                            onDocumentPress={onOfferDocument}
                        />
                    )}
                </>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanProlongationConfirmScreen);
