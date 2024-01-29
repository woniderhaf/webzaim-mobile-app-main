import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../core/layouts/main-layout';
import ScrollViewLayout from '../../core/layouts/scroll-view-layout';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { deleteLoanRequest, postLoanRequestConfirmCheck } from '../../core/api';
import { useUIStore } from '../../store';
import { GLOBAL_ERROR_TEXT } from '../../core/constants';
import { ButtonApperiance, SmsConfirmationTypes } from '../../core/enums';
import { SmsConfirmationForm } from '../../core/components';
import analytics from '../../core/analytics';
import locale from './locale';

const SmsConfirmationScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.SMS_CONFIRMATION>['navigation']>();
    const { params } = useRoute<RootStackScreenProps<ROUTES.SMS_CONFIRMATION>['route']>();
    const { setModal } = useUIStore();
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    useEffect(() => {
        const backAction = () => {
            onCancel();

            return true;
        };

        const hardwareBackPressSunscribe = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            hardwareBackPressSunscribe.remove();
        };
    }, []);

    const onSubmit = async (code: string) => {
        setGlobalError('');
        setLoading(true);

        try {
            const response = await postLoanRequestConfirmCheck(code);

            if (response.data) {
                successModal();
                analytics.sendEvent('SmsConfirmationSuccess');
            } else if (response.errors) {
                // "ehws" api ¯\_(ツ)_/¯
                const $error = response.errors?.ehws?.join(' ');

                setGlobalError($error || response.message || GLOBAL_ERROR_TEXT);
            }
        } catch {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const onOfferDocument = async () => {
        const { document } = params;

        navigation.navigate(ROUTES.DOCUMENT, { url: document, full: true });
    };

    const goToLoans = () => {
        navigation.replace(ROUTES.MAIN, {
            screen: ROUTES.LOANS_STACK,
            params: {
                screen: ROUTES.USER_LOANS
            }
        });
    };

    const successModal = () => {
        setModal({
            title: locale.successModal.title,
            message: locale.successModal.message,
            buttons: [
                {
                    label: locale.successModal.successButton,
                    onPress: () => {
                        setModal(null);
                        goToLoans();
                    }
                }
            ]
        });
    };

    const onCancel = () => {
        setModal({
            title: locale.cancelModal.title,
            verticalButtons: true,
            buttons: [
                {
                    label: locale.cancelModal.successButton,
                    onPress: () => {
                        setModal(null);
                    }
                },
                {
                    label: locale.cancelModal.cancelButton,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => {
                        analytics.sendEvent('SmsConfirmationCancelled');
                        setModal(null);
                        deleteRequest();
                    }
                }
            ]
        });
    };

    const deleteRequest = async () => {
        setLoading(true);

        try {
            const { status } = await deleteLoanRequest();

            if (status === 200) {
                goToLoans();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: false,
                onBackPress: () => {}
            }}
        >
            <ScrollViewLayout>
                <View>
                    <SmsConfirmationForm
                        type={SmsConfirmationTypes.REQUEST}
                        error={globalError}
                        phone={params.phone}
                        doubleCode={params.doubleCode}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        onDocumentPress={onOfferDocument}
                    />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(SmsConfirmationScreen);
