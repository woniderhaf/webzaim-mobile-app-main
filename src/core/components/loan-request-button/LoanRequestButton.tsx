import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation';
import { useLoanStore } from '../../../store';
import { Button } from '../../ui';

const LoanRequestButton = () => {
    const { activeLoan } = useLoanStore();
    const navigation = useNavigation();

    const onLoanRequest = useCallback(() => {
        navigation.navigate(
            ROUTES.MAIN,
            {
                screen: ROUTES.LOANS_STACK,
                params: {
                    screen: ROUTES.USER_LOANS
                }
            }
        );
    }, []);

    return useMemo(() => {
        if (activeLoan) {
            return null;
        }

        return (
            <View>
                <Button value="Оформить займ" onClick={onLoanRequest}/>
            </View>
        );
    }, [activeLoan]);
};

export default observer(LoanRequestButton);
