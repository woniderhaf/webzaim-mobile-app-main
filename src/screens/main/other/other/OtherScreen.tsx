import React, { useMemo } from 'react';
import { Linking, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { LoanRequestButton } from '../../../../core/components';
import { ButtonIcon, ButtonList, Icon } from '../../../../core/ui';
import useLog from '../../../../core/hooks/useLog';
import { version } from '../../../../../app.json';
import { useUserStore } from '../../../../store';
import locale from './locale';
import styles from './styles';

const OtherScreen = () => {
    const navigation = useNavigation<OtherStackScreenProps<ROUTES.OTHER>['navigation']>();
    const [onPressLog, onLongPressLog] = useLog();
    const { isTestUser } = useUserStore();

    const buttons = [
        {
            title: locale.menu.about,
            onPress: () => navigation.navigate(ROUTES.ABOUT)
        },
        {
            title: locale.menu.faq,
            onPress: () => navigation.navigate(ROUTES.FAQ)
        },
        {
            title: locale.menu.docs,
            onPress: () => navigation.navigate(ROUTES.APP_DOCUMENTS_LIST)
        },
        {
            title: locale.menu.news,
            onPress: () => navigation.navigate(ROUTES.NEWS)
        }
    ];

    const socialLinks = [
        {
            id: 'vk',
            href: Config.VK_URL || ''
        }
    ];

    /**
     * @description Отрисовываем список меню
     * Для тестового пользователя нету раздела FAQ
     */
    const renderMenu = useMemo(() => {
        let menuList = buttons;

        if (isTestUser()) {
            menuList = menuList.filter(menu => menu.title !== locale.menu.faq);
        }

        return menuList.map(btn => (
            <View key={JSON.stringify(btn)} style={styles.buttonContainer}>
                <ButtonList title={btn.title} onPress={btn.onPress} />
            </View>
        ));
    }, [buttons]);

    const renderSocialLinks = useMemo(() => {
        return socialLinks.map(link => (
            <View key={link.id} style={styles.link}>
                <ButtonIcon name={link.id} size={30} onPress={() => Linking.openURL(link.href)} />
            </View>
        ));
    }, [buttons]);

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle
            }}>
            <ScrollViewLayout hasTabbar>
                <View>
                    <View style={styles.appInfo}>
                        <TouchableWithoutFeedback onPress={onPressLog} onLongPress={onLongPressLog}>
                            <View style={styles.appIcon}>
                                <Icon name="appIcon" size={80} />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text selectable={false} style={styles.appVersion}>
                            {`${locale.appVersion} ${version}`}
                        </Text>
                    </View>
                    {renderMenu}
                    <View style={styles.socialLinks}>{renderSocialLinks}</View>
                    <LoanRequestButton />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default OtherScreen;
