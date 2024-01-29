import React, { useEffect } from 'react';
import { Platform, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ParamListBase, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList, NAVIGATION_LOGOUT_ACTION, ROUTES } from '../../navigation';
import { Icon } from '../../core/ui';
import { INSETS } from '../../core/utils';
import { BOTTOM_BAR_HEIGHT } from '../../core/constants';
import { useAuthStore } from '../../store';
import PromotionsStack from './promotions';
import HistoryScreen from './history';
import LoansScreen from './loans';
import ProfileScreen from './profile';
import OtherStack from './other';
import styles from './styles';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabMap = Record<string, string>;

const titles: TabMap = {
    [ROUTES.PROMOTIONS_STACK]: 'Акции',
    [ROUTES.HISTORY]: 'История',
    [ROUTES.LOANS_STACK]: 'Мои займы',
    [ROUTES.PROFILE_STACK]: 'Профиль',
    [ROUTES.OTHER_STACK]: 'Ещё'
};

const icons: TabMap = {
    [ROUTES.PROMOTIONS_STACK]: 'sales',
    [ROUTES.HISTORY]: 'history',
    [ROUTES.LOANS_STACK]: 'zaim',
    [ROUTES.PROFILE_STACK]: 'profile',
    [ROUTES.OTHER_STACK]: 'other'
};

const screenOptions:
    | ((props: { route: RouteProp<ParamListBase, string>; navigation: any }) => BottomTabNavigationOptions)
    | undefined = ({ route }) => {
    const tabBarOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarLabel: ({ focused }) => {
            return (
                <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                    {titles[route.name] ?? 'Другое'}
                </Text>
            );
        },
        tabBarLabelStyle: {
            // flex: 1,
            // fontSize: 12
        },
        tabBarIcon: ({ focused }) => {
            const icon = icons[route.name] ?? 'more';

            return <Icon name={focused ? `${icon}Active` : icon} size={24} />;
        },
        tabBarStyle: {
            paddingTop: 6,
            height: Platform.select({
                ios: INSETS.top + BOTTOM_BAR_HEIGHT,
                android: BOTTOM_BAR_HEIGHT
            })
        }
    };

    return tabBarOptions;
};

const MainScreen = () => {
    const navigation = useNavigation();
    const { auth, logout } = useAuthStore();

    useEffect(() => {
        if (!auth) {
            logout(true);
            navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
        }
    }, [auth, logout]);

    return (
        <Tab.Navigator initialRouteName={ROUTES.LOANS_STACK} screenOptions={screenOptions}>
            <Tab.Screen name={ROUTES.PROMOTIONS_STACK} component={PromotionsStack} />
            <Tab.Screen name={ROUTES.HISTORY} component={HistoryScreen} />
            <Tab.Screen name={ROUTES.LOANS_STACK} component={LoansScreen} />
            <Tab.Screen name={ROUTES.PROFILE_STACK} component={ProfileScreen} />
            <Tab.Screen name={ROUTES.OTHER_STACK} component={OtherStack} />
        </Tab.Navigator>
    );
};

export default observer(MainScreen);
