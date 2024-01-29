import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useCommonStore, useUIStore } from '../../../store';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import PaymentMethodsPanel, { OnAddParams } from '../../../core/components/payment-methods-panel';
import { Button, ErrorMessage } from '../../../core/ui';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import locale from './locale';
import styles from './styles';

const RegistrationMoneyTransferScreen = () => {
    const { setLoading } = useUIStore();
    const { isNeedUpdateMethodPaymentList, setIsNeedUpdateMethodPaymentList } = useCommonStore();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_MONEY_TRANSFER>['navigation']>();
    const [isError, setIsError] = useState(false);
    const [isContinue, setIsContinue] = useState(false);

    const onAdd = (params: OnAddParams) => {
        navigation.navigate(ROUTES.REGISTRATION_MONEY_TRANSFER_ADD, params);
    };

    const fetchFinally = () => {
        setIsNeedUpdateMethodPaymentList(false);
    };

    const footerComponent = () => {
        return (
            isContinue && (
                <View style={styles.btnContainer}>
                    <Button
                        value={locale.submit}
                        disabled={!isContinue}
                        onClick={() => navigation.navigate(ROUTES.REGISTRATION_REQUEST_DOCUMENTS)}
                    />
                </View>
            )
        );
    };

    return (
        <RegistrationLayout title={locale.formTitle} footerComponent={footerComponent()}>
            <>
                {isError && <ErrorMessage message={GLOBAL_ERROR_TEXT} />}
                <PaymentMethodsPanel
                    isRegistration
                    isNeedUpdate={isNeedUpdateMethodPaymentList}
                    changeIsError={setIsError}
                    changeIsLoading={setLoading}
                    onAdd={onAdd}
                    changeIsContinue={setIsContinue}
                    fetchFinally={fetchFinally}
                />
            </>
        </RegistrationLayout>
    );
};

export default observer(RegistrationMoneyTransferScreen);
