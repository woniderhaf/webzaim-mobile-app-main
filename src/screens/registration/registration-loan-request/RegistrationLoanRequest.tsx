import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useLoanStore, useUIStore } from '../../../store';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import { LoanRequest } from '../../../core/components';
import { ILoanRequestParams } from '../../../core';
import { getLoanRequestConfig } from '../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import { ErrorMessage } from '../../../core/ui';

const RegistrationLoanRequestScreen = () => {
    const { config, setLoanRequest, setNewLoanConfig } = useLoanStore();
    const { loading, setLoading } = useUIStore();
    const [error, setError] = useState('');
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_LOAN_REQUEST>['navigation']>();

    useEffect(() => {
        if (!config) {
            fetchLoanConfig();
        }
    }, []);

    const fetchLoanConfig = async () => {
        setLoading(true);

        try {
            const { data } = await getLoanRequestConfig();

            if (data) {
                setNewLoanConfig(data);
            }
        } catch {
            setError(GLOBAL_ERROR_TEXT);
            // navigation.replace(ROUTES.ERROR_500);
        } finally {
            setLoading(false);
        }
    };
    const onRequest = async (params: ILoanRequestParams) => {
        setLoanRequest({
            loanSize: params.sum,
            loanTerm: params.days,
            gracePeriodApplied: params.grace,
            appliedAddonIds: params.addons,
            promoCode: params.promoCode
        });
        navigation.navigate(ROUTES.REGISTRATION_MONEY_TRANSFER);
    };

    const onOpenDescription = async (name: string, text: string, docUrl?: string, docTitle?: string) => {
        navigation.navigate(ROUTES.LOAN_ADDON_DESCRIPTION, { text, name, docUrl, docTitle });
    };

    const onOpenDocument = async (url: string) => {
        navigation.navigate(ROUTES.DOCUMENT, { url });
    };

    const topShift = Boolean(error) || loading ? 0 : -205;

    return (
        <RegistrationLayout topShift={topShift}>
            <View style={{ marginTop: topShift }}>
                {Boolean(error) && <ErrorMessage message={error} />}
                {config && (
                    <LoanRequest
                        config={config}
                        onRequest={onRequest}
                        onOpenDescription={onOpenDescription}
                        onOpenDocument={onOpenDocument}
                        congratulations
                    />
                )}
            </View>
        </RegistrationLayout>
    );
};

export default observer(RegistrationLoanRequestScreen);
