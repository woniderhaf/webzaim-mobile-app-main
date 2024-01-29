import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ButtonList } from '../../../../core/ui';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import locale from './locale';
import styles from './styles';

// @TODO объединить с LOAN_REQUEST_MONEY_TRANSFER_ADD

const UserMoneyTransferAddScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.USER_MONEY_TRANSFER_ADD>['navigation']>();
    const { params } = useRoute<ProfileScreenProps<ROUTES.USER_MONEY_TRANSFER_ADD>['route']>();

    const renderMethods = () => {
        const { canAddCard, cardServiceEndpointRequest, canAddBankAccount } = params;
        const buttons = [];

        if (canAddCard && cardServiceEndpointRequest) {
            buttons.push({
                title: locale.card,
                onPress: () => {
                    navigation.navigate(
                        ROUTES.USER_MONEY_TRANSFER_ADD_CARD,
                        { endpoint: cardServiceEndpointRequest }
                    );
                }
            });
        }

        if (canAddBankAccount) {
            buttons.push({
                title: locale.bank,
                onPress: () => {
                    navigation.navigate(ROUTES.USER_MONEY_TRANSFER_ADD_BANK);
                }
            });
        }

        return buttons.map((btn) => (
            <ButtonList
                key={btn.title}
                title={btn.title}
                onPress={btn.onPress}
                style={styles.button}
            />
        ));
    };

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
                    {renderMethods()}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(UserMoneyTransferAddScreen);
