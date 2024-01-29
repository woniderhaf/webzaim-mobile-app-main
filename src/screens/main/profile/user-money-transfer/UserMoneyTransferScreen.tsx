import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { ErrorMessage } from '../../../../core/ui';
import PaymentMethodsPanel, { OnAddParams } from '../../../../core/components/payment-methods-panel';
import { useCommonStore } from '../../../../store';
import locale from './locale';

const UserMoneyTransferScreen = () => {
    const { isNeedUpdateMethodPaymentList, setIsNeedUpdateMethodPaymentList } = useCommonStore();
    const navigation = useNavigation<ProfileScreenProps<ROUTES.USER_MONEY_TRANSFER>['navigation']>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const onAdd = (params: OnAddParams) => {
        navigation.navigate(ROUTES.USER_MONEY_TRANSFER_ADD, params);
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
                    changeIsError={setIsError}
                    changeIsLoading={setIsLoading}
                    onAdd={onAdd}
                    isNeedUpdate={isNeedUpdateMethodPaymentList}
                    fetchFinally={fetchFinally}
                />
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(UserMoneyTransferScreen);
