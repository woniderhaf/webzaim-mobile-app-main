import React, { useEffect, useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useLoanStore, useUIStore } from '../../../../store';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { ILoanRequestParams } from '../../../../core';
import { deleteLoanRequest, getCurrentLoan, getLoanRequestConfig, getLoanRequestConfirm } from '../../../../core/api';
import { ButtonApperiance, LoanRequestStatus, SmsConfirmationTypes } from '../../../../core/enums';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { LoanDays, LoanPreview, LoanRequest } from '../../../../core/components';
import { BoxShadow, Button, ErrorMessage, InfoText } from '../../../../core/ui';
import styles from './styles';

const UserLoansScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.USER_LOANS>['navigation']>();
    const { setModal } = useUIStore();
    const store = useLoanStore();
    const activeLoan = store.activeLoan;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        store.clear();

        try {
            const currentLoan = await getCurrentLoan();

            if (currentLoan?.data) {
                store.setActiveLoan(currentLoan.data);

                return;
            } else {
                const config = await getLoanRequestConfig();

                if (config?.data) {
                    store.setNewLoanConfig(config.data);

                    return;
                }
            }

            setError(GLOBAL_ERROR_TEXT);
        } catch {
            navigation.replace(ROUTES.ERROR_500);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timer | null = null;
        const activeLoanStatus = activeLoan?.request.status;
        const isNeedPassportScanActiveLoan = activeLoan?.request.requirePassportScans?.mainPage;

        if (activeLoanStatus === LoanRequestStatus.PENDING_APPROVAL) {
            timer = setInterval(async () => {
                const currentLoan = await getCurrentLoan();
                const currentLoanStatus = currentLoan.data?.request.status;
                const isNeedPassportScanCurrentLoan = currentLoan.data?.request.requirePassportScans?.mainPage;

                if (
                    currentLoan.data &&
                    (activeLoanStatus !== currentLoanStatus ||
                        isNeedPassportScanActiveLoan !== isNeedPassportScanCurrentLoan)
                ) {
                    store.setActiveLoan(currentLoan.data);
                }
            }, 15000);
        }

        return () => {
            timer && clearTimeout(timer);
        };
    }, [activeLoan]);

    const onPayPress = () => {
        if (activeLoan) {
            const {
                paymentInfo: { totalPayableToday }
            } = activeLoan;

            navigation.navigate(ROUTES.LOAN_PAYMENT_METHOD, { sum: totalPayableToday });
        }
    };

    const onPress = () => navigation.push(ROUTES.LOAN);

    const onRequest = async (params: ILoanRequestParams) => {
        store.setLoanRequest({
            loanSize: params.sum,
            loanTerm: params.days,
            gracePeriodApplied: params.grace,
            appliedAddonIds: params.addons,
            promoCode: params.promoCode
        });

        navigation.navigate(ROUTES.LOAN_REQUEST_MONEY_TRANSFER);
    };

    const onOpenDescription = async (name: string, text: string, docUrl?: string, docTitle?: string) => {
        navigation.navigate(ROUTES.LOAN_ADDON_DESCRIPTION, { text, name, docUrl, docTitle });
    };

    const onOpenDocument = async (url: string) => {
        navigation.navigate(ROUTES.DOCUMENT, { url });
    };

    const continueRequest = async () => {
        setLoading(true);

        try {
            const { data } = await getLoanRequestConfirm();

            if (data) {
                navigation.navigate(ROUTES.SMS_CONFIRMATION, {
                    type: SmsConfirmationTypes.REQUEST,
                    phone: data.clientPhoneNumber,
                    document: data.offerDocumentDownloadHref,
                    doubleCode: data.doubleCode
                });
            } else {
                setError(GLOBAL_ERROR_TEXT);
            }
        } catch {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const onCancel = () => {
        setModal({
            title: 'Вы уверены, что хотите отменить заявку на займ?',
            verticalButtons: true,
            buttons: [
                {
                    label: 'Продолжить оформление',
                    onPress: () => {
                        setModal(null);
                    }
                },
                {
                    label: 'Отменить заявку',
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => {
                        setModal(null);
                        deleteRequest();
                    }
                }
            ]
        });
    };

    const onOpenOtherLinks = async () => {
        const url = activeLoan?.request?.otherOffersLinkHref || '';

        if (url) {
            try {
                const canOpen = await Linking.canOpenURL(url);

                if (canOpen) {
                    Linking.openURL(url);
                }
            } catch {}
        }
    };

    const deleteRequest = async () => {
        setLoading(true);

        try {
            const { status } = await deleteLoanRequest();

            if (status === 200) {
                await fetchData();
            }
        } finally {
            setLoading(false);
        }
    };

    const onPressUpload = () => {
        navigation.navigate(ROUTES.PASSPORT_SCAN);
    };

    const renderLoans = () => {
        if (!activeLoan) {
            return null;
        }

        const disabled = activeLoan?.request.status !== LoanRequestStatus.APPROVED;

        return (
            <View>
                <LoanPreview
                    loan={activeLoan}
                    onPayPress={disabled ? undefined : onPayPress}
                    onPress={disabled ? undefined : onPress}
                />
                {activeLoan.request.status === LoanRequestStatus.REJECTED && (
                    <>
                        <LoanDays count={activeLoan.request?.daysUntilNextRequest || 0} warning />
                        <BoxShadow paddingVertical={18} paddingHorizontal={12}>
                            <Text style={styles.infoTitle}>Информация о займе</Text>
                            <Text style={styles.text}>
                                К сожалению, мы не можем утвердить Вашу заявку, но Вы можете оформить займ у нашего
                                партнера.
                            </Text>
                            <Text style={styles.text}>
                                Мы подобрали для Вас компании, подходящие по Вашему критерию, где уровень одобрения по
                                Вашей заявке будет составлять 97%
                            </Text>
                            <Button value="Посмотреть одобренные займы" style={styles.btn} onClick={onOpenOtherLinks} />
                        </BoxShadow>
                    </>
                )}
                {activeLoan.request.status === LoanRequestStatus.WAITING && (
                    <BoxShadow paddingVertical={18} paddingHorizontal={12}>
                        <Text style={styles.infoTitle}>Информация о займе</Text>
                        <Text style={styles.text}>
                            Для продолжения оформления займа Вам необходимо подтвердить действие с помощью цифрового
                            кода, отправленного Вам по SMS
                        </Text>
                        <Button value="Подтвердить заявку" style={styles.btn} onClick={continueRequest} />
                        <Button
                            value="Отменить заявку"
                            style={[styles.btn, styles.btnWhite]}
                            apperience={ButtonApperiance.SECONDARY}
                            onClick={onCancel}
                        />
                    </BoxShadow>
                )}
                {activeLoan.request.requirePassportScans?.mainPage && (
                    <View style={{ marginBottom: 16 }}>
                        <InfoText
                            apperiance={'warning'}
                            iconName={'errorOrange'}
                            value="Чтобы получить одобренную сумму, Вам необходимо прикрепить скан паспорта."
                        />
                        <Button style={styles.scanBtn} value={'Прикрепление скана'} onClick={onPressUpload} />
                    </View>
                )}
            </View>
        );
    };

    const renderLoanRequest = () => {
        if (!store.config) {
            return null;
        }

        return (
            <View>
                <View style={{ marginBottom: 16 }}>
                    <InfoText value="На данный момент у вас нет активного займа. Оформление займа займет у вас не более 10 минут!" />
                </View>
                <LoanRequest
                    config={store.config}
                    onRequest={onRequest}
                    onOpenDescription={onOpenDescription}
                    onOpenDocument={onOpenDocument}
                />
            </View>
        );
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: 'Мои займы'
            }}
        >
            <ScrollViewLayout hasTabbar>
                {error.length > 0 && <ErrorMessage message={error} />}
                {activeLoan ? renderLoans() : renderLoanRequest()}
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(UserLoansScreen);
