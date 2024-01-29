import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList, ROUTES } from '../../../navigation';
import ProfileListScreen from './profile-list';
import UserProfileScreen from './user-profile';
import AppSettingsScreen from './app-settings';
import UserMoneyTransferScreen from './user-money-transfer';
import UserMoneyTransferAddScreen from './user-money-transfer-add';
import UserMoneyTransferAddCardScreen from './user-money-transfer-add-card';
import UserMoneyTransferAddBankScreen from './user-money-transfer-add-bank';
import UserAppealsScreen from './user-appeals';
import AppealsListScreen from './appeals-list';
import AppealsCategoriesScreen from './appeals-categories';
import AppealCreateScreen from './appeal-create';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileScreen = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name={ROUTES.PROFILE_LIST} component={ProfileListScreen} />
            <ProfileStack.Screen name={ROUTES.USER_PROFILE} component={UserProfileScreen} />
            <ProfileStack.Screen name={ROUTES.USER_MONEY_TRANSFER} component={UserMoneyTransferScreen} />
            <ProfileStack.Screen name={ROUTES.USER_MONEY_TRANSFER_ADD} component={UserMoneyTransferAddScreen} />
            <ProfileStack.Screen name={ROUTES.USER_MONEY_TRANSFER_ADD_CARD} component={UserMoneyTransferAddCardScreen} />
            <ProfileStack.Screen name={ROUTES.USER_MONEY_TRANSFER_ADD_BANK} component={UserMoneyTransferAddBankScreen} />
            <ProfileStack.Screen name={ROUTES.APP_SETTINGS} component={AppSettingsScreen} />
            <ProfileStack.Screen name={ROUTES.APPEALS_CATEGORIES} component={AppealsCategoriesScreen} />
            <ProfileStack.Screen name={ROUTES.APPEALS_LIST} component={AppealsListScreen} />
            <ProfileStack.Screen name={ROUTES.APPEAL_CREATE} component={AppealCreateScreen} />
            <ProfileStack.Screen name={ROUTES.USER_APPEALS} component={UserAppealsScreen} />
        </ProfileStack.Navigator>
    );
};

export default observer(ProfileScreen);
