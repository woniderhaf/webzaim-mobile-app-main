import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useLoanStore } from '../../../../store';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { Button, Input } from '../../../../core/ui';
import { numberFormat } from '../../../../core/utils';
import locale from './locale';
import styles from './styles';

const LoanPaymentSumScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_PAYMENT_SUM>['navigation']>();
    const { loanPaymentSum } = useLoanStore();
    const [sum, setSum] = useState('');
    const [sumError, setSumError] = useState('');

    const onChangeSum = (value: string) => {
        if (setSumError) {
            setSumError('');
        }

        setSum(value.replace(',', '.'));
    };

    const onSubmit = () => {
        if (!sum || Number(sum) === 0) {
            setSumError(locale.form.errorEmpty);

            return;
        }

        if (Number(sum) > loanPaymentSum) {
            setSumError(`${locale.form.errorLimit} ${loanPaymentSum}`);

            return;
        }

        navigation.navigate(ROUTES.LOAN_PAYMENT_METHOD, { sum });
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
                    <View style={styles.form}>
                        <Text style={styles.formTitle}>{locale.title}</Text>
                        <View style={styles.formControl}>
                            <Input
                                value={sum}
                                error={sumError}
                                label={locale.form.sum}
                                onChange={onChangeSum}
                                type="numeric"
                                format={numberFormat()}
                            />
                        </View>
                    </View>
                    <View >
                        <Button
                            value={locale.form.submit}
                            onClick={onSubmit}
                        />
                    </View>
                </>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanPaymentSumScreen);
