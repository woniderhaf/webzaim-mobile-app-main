import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useLoanStore } from '../../../../store';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { amountFormat, daysFormat } from '../../../../core/utils';
import { ButtonList, ErrorMessage, Icon } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

type ProlongationButton = {
    title: string,
    onPress: () => any,
    subtitle?: string,
    iconPosition?: string
};

const LoanProlongationScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_PROLONGATION>['navigation']>();
    const store = useLoanStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [options, setOptions] = useState<Array<ProlongationButton>>([]);

    useEffect(() => {
        if (store.activeLoan) {
            const $options:Array<ProlongationButton> = [];
            const { prolongationOptions, partialPayment } = store.activeLoan.paymentOptions;

            if (prolongationOptions.length > 0) {
                prolongationOptions.forEach(option => {
                    $options.push({
                        title: `${locale.prolongationTitle} ${daysFormat(option.periodDays)}`,
                        subtitle: `${locale.prolongationSubtitle} ${amountFormat(option.cost, true)}`,
                        onPress: () => goToConfirmation(option.periodDays, option.cost)
                    });
                });
            }

            if (partialPayment) {
                $options.push({
                    title: locale.partialPayment,
                    onPress: goToPayment,
                    iconPosition: 'middle'
                });
            }

            setOptions($options);
        }
    }, [store.activeLoan]);

    const goToConfirmation = async (period: number, amount: string) => {
        navigation.navigate(ROUTES.LOAN_PROLONGATION_CONFIRM, { period, amount });
    };

    const goToPayment = () => navigation.navigate(ROUTES.LOAN_PAYMENT_SUM);

    const renderOptions = () => options.map((option, index) => (
        <View key={JSON.stringify(option)} style={{ marginTop: index > 0 ? 16 : 0 }}>
            <ButtonList onPress={option.onPress} iconPosition={option.subtitle ? 'flex-start' : 'center'}>
                <View style={[styles.button, { alignItems: option.subtitle ? 'flex-start' : 'center' }]}>
                    <View style={styles.buttonIcon}>
                        <Icon name="clockPlus" size={34} />
                    </View>
                    <View>
                        <Text style={styles.buttonTitle} numberOfLines={1}>
                            {option.title}
                        </Text>
                        {option.subtitle && (
                            <Text style={styles.buttonSubtitle} numberOfLines={1}>
                                {option.subtitle}
                            </Text>
                        )}
                    </View>
                </View>
            </ButtonList>
        </View>
    ));

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true

            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>
                    {error.length > 0 && <ErrorMessage message={error} />}
                    {renderOptions()}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanProlongationScreen);
