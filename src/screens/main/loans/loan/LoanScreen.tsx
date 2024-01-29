import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { LoanDays, LoanPreview } from '../../../../core/components';
import { Button, ButtonList } from '../../../../core/ui';
import { useLoanStore } from '../../../../store';
import locale from './locale';

type LoanButton = {
    title: string,
    onPress: () => any
};

const LoanScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN>['navigation']>();
    const { activeLoan } = useLoanStore();
    const [buttons, setButtons] = useState<Array<LoanButton>>([]);

    const redirectOnDocuments = () => {
        if (activeLoan && activeLoan.documentFileHref) {
            navigation.navigate(ROUTES.DOCUMENT, {
                url: activeLoan.documentFileHref,
                full: true
            });
        }
    };

    useEffect(() => {
        if (activeLoan) {
            const { paymentOptions, documentFileHref } = activeLoan;

            const $buttons: Array<LoanButton> = [];

            if (paymentOptions) {
                if (paymentOptions.prolongationOptions.length > 0 ) {
                    $buttons.push({
                        title: locale.prolongation,
                        onPress: () => {
                            navigation.navigate(ROUTES.LOAN_PROLONGATION);
                        }
                    });
                } else if (paymentOptions.partialPayment) {
                    $buttons.push({
                        title: locale.partialPayment,
                        onPress: () => {
                            navigation.navigate(ROUTES.LOAN_PAYMENT_SUM);
                        }
                    });
                }
            }

            if (documentFileHref) {
                $buttons.push({
                    title: locale.documents,
                    onPress: redirectOnDocuments
                });
            }

            $buttons.push({
                title: locale.info,
                onPress: () => {
                    navigation.navigate(ROUTES.LOAN_INFO);
                }
            });

            setButtons($buttons);
        }
    }, [activeLoan]);

    const onPayPress = () => {
        if (activeLoan) {
            const { paymentInfo: { totalPayableToday } } = activeLoan;

            navigation.navigate(ROUTES.LOAN_PAYMENT_METHOD, { sum: totalPayableToday });
        }
    };

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <>
                    {activeLoan && (
                        <View>
                            <LoanPreview loan={activeLoan} />
                            <LoanDays count={Number(activeLoan?.paymentInfo?.daysUntilRepayment || 0)} />
                            {buttons.map((btn) => (
                                <View key={JSON.stringify(btn)} style={{ marginBottom: 16 }}>
                                    <ButtonList
                                        title={btn.title}
                                        onPress={btn.onPress}
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                    <View>
                        <Button
                            value={locale.payment}
                            onClick={onPayPress}
                        />
                    </View>
                </>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanScreen);
