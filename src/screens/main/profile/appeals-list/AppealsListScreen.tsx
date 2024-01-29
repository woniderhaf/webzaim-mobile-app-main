import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { IAppeal } from '../../../../core/interfaces';
import { ButtonList } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const AppealsListScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.APPEALS_LIST>['navigation']>();
    const route = useRoute<ProfileScreenProps<ROUTES.APPEALS_LIST>['route']>();
    const [appeals, setAppeals] = useState<Array<IAppeal>>(route?.params?.appeals || []);

    const onPressAppeal = (appeal: IAppeal) => {
        navigation.navigate(ROUTES.APPEAL_CREATE, { type: appeal.type });
    };

    const renderAppeals = useMemo(() => {
        return appeals.map((appeal) => (
            <View key={appeal.type} style={styles.btn}>
                <ButtonList
                    title={appeal.title}
                    onPress={() => onPressAppeal(appeal)}
                />
            </View>
        ));
    }, [appeals]);

    return (
        <MainLayout
            theme="gray"
            header={{
                title: route?.params?.title || locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>
                    {renderAppeals}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default AppealsListScreen;
