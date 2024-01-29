import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PromotionsStackParamList, ROUTES } from '../../../navigation';
import PromotionsScreen from './promotions';
import PromotionScreen from './promotion';

const PromotionsStack = createNativeStackNavigator<PromotionsStackParamList>();

const PromotionsStackScreen = () => {
    return (
        <PromotionsStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.PROMOTIONS}>
            <PromotionsStack.Screen name={ROUTES.PROMOTIONS} component={PromotionsScreen} />
            <PromotionsStack.Screen name={ROUTES.PROMOTION} component={PromotionScreen} />
        </PromotionsStack.Navigator>
    );
};

export default observer(PromotionsStackScreen);
