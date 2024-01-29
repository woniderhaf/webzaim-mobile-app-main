import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ButtonList } from '../../../../core/ui';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import locale from './locale';
import styles from './styles';

const LoanRequestMoneyTransferAddScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_REQUEST_MONEY_TRANSFER_ADD>['navigation']>();
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_REQUEST_MONEY_TRANSFER_ADD>['route']>();

    const renderMethods = useMemo(() => {
        const { canAddCard, cardServiceEndpointRequest, canAddBankAccount } = route.params || {};
        const buttons = [];

        if (canAddCard && cardServiceEndpointRequest) {
            buttons.push({
                title: locale.card,
                onPress: () => {
                    navigation.navigate(ROUTES.LOAN_REQUEST_ADD_CARD, { endpoint: cardServiceEndpointRequest });
                }
            });
        }

        if (canAddBankAccount) {
            buttons.push({
                title: locale.bank,
                onPress: () => {
                    navigation.navigate(ROUTES.LOAN_REQUEST_ADD_BANK);
                }
            });
        }

        return buttons.map(btn => (
            <ButtonList key={btn.title} title={btn.title} onPress={btn.onPress} style={styles.button} />
        ));
    }, [route.params]);

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                <View>
                    <Text style={styles.title}>{locale.title}</Text>
                    {renderMethods}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanRequestMoneyTransferAddScreen);
