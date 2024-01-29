import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { Button, ErrorMessage } from '../../../../core/ui';
import PaymentMethodsPanel, { OnAddParams } from '../../../../core/components/payment-methods-panel';
import { useCommonStore } from '../../../../store';
import locale from './locale';
import styles from './styles';

const LoanRequestMoneyTransferScreen = () => {
    const { isNeedUpdateMethodPaymentList, setIsNeedUpdateMethodPaymentList } = useCommonStore();
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_REQUEST_MONEY_TRANSFER>['navigation']>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isContinue, setIsContinue] = useState(false);

    const onAdd = (params: OnAddParams) => {
        navigation.navigate(ROUTES.LOAN_REQUEST_MONEY_TRANSFER_ADD, params);
    };

    const fetchFinally = () => {
        setIsNeedUpdateMethodPaymentList(false);
    };

    return (
        <MainLayout
            theme="gray"
            loading={isLoading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                {isError && <ErrorMessage message={GLOBAL_ERROR_TEXT} />}
                <PaymentMethodsPanel
                    changeIsLoading={setIsLoading}
                    changeIsError={setIsError}
                    changeIsContinue={setIsContinue}
                    onAdd={onAdd}
                    isNeedUpdate={isNeedUpdateMethodPaymentList}
                    fetchFinally={fetchFinally}
                />
            </ScrollViewLayout>
            {isContinue && (
                <View style={styles.btnContainer}>
                    <Button
                        value={locale.submit}
                        disabled={!isContinue}
                        onClick={() => navigation.navigate(ROUTES.LOAN_REQUEST_DOCUMENTS)}
                    />
                </View>
            )}
        </MainLayout>
    );
};

export default observer(LoanRequestMoneyTransferScreen);
