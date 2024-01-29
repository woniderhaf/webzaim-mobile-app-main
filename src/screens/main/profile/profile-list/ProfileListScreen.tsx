import React, { useMemo } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { postLogout } from '../../../../core/api';
import { NAVIGATION_LOGOUT_ACTION, ProfileScreenProps, ROUTES } from '../../../../navigation';
import { useAuthStore, useUIStore } from '../../../../store';
import { ButtonApperiance } from '../../../../core/enums';
import { Button, ButtonList } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const ProfileListScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.PROFILE_LIST>['navigation']>();
    const store = useAuthStore();
    const { setModal } = useUIStore();

    const buttons = [
        {
            title: locale.menu.profile,
            onPress: () => navigation.navigate(ROUTES.USER_PROFILE)
        },
        {
            title: locale.menu.notitifications,
            onPress: () => navigation.navigate(ROUTES.UNDER_CONSTRUCTION)
        },
        {
            title: locale.menu.appeals,
            onPress: () => navigation.navigate(ROUTES.USER_APPEALS)
        },
        {
            title: locale.menu.moneyTransfer,
            onPress: () => navigation.navigate(ROUTES.USER_MONEY_TRANSFER)
        },
        {
            title: locale.menu.changePassword,
            onPress: () => navigation.navigate(ROUTES.CHANGE_PASSWORD)
        },
        {
            title: locale.menu.settings,
            onPress: () => navigation.navigate(ROUTES.APP_SETTINGS)
        }
    ];

    const logout = async () => {
        try {
            await postLogout();
            await store.logout();
        } finally {
            setModal(null);
            navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
        }
    };

    const onLogout = () => {
        setModal({
            title: locale.promt.title,
            buttons: [
                {
                    label: locale.promt.success,
                    onPress: logout
                },
                {
                    label: locale.promt.cancel,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => setModal(null)
                }
            ]
        });
    };

    const renderMenu = useMemo(() => {
        return buttons.map((btn) => (
            <View key={JSON.stringify(btn)} style={styles.buttonContainer}>
                <ButtonList
                    title={btn.title}
                    onPress={btn.onPress}
                />
            </View>
        ));
    }, [buttons]);

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>
                    {renderMenu}
                    <Button value={locale.logout} onClick={onLogout} transparent/>
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(ProfileListScreen);
