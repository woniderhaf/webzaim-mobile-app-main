import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { getUserAppeals } from '../../../../core/api';
import { ButtonApperiance } from '../../../../core/enums';
import { IUserAppeal } from '../../../../core/interfaces';
import { UserAppeal } from '../../../../core/components';
import { Button, InfoText } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const UserAppealsScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.USER_APPEALS>['navigation']>();
    const [loading, setLoading] = useState(true);
    const [appeals, setAppeals] = useState<Array<IUserAppeal>>([]);

    useEffect(() => {
        fetchUserAppeals();
    }, []);

    const fetchUserAppeals = async () => {
        setLoading(true);

        try {
            const response = await getUserAppeals();

            if (response.data) {
                setAppeals(response.data);
            }

        } finally {
            setLoading(false);
        }
    };

    const renderAppeal = ({ item, index }: ListRenderItemInfo<IUserAppeal>) => {
        return (
            <View key={item.documentNumber} style={{ marginTop: index === 0 ? 32 : 20 }}>
                <UserAppeal appeal={item}/>
            </View>
        );
    };

    const renderInfo = () => (
        <View style={styles.empty}>
            <InfoText
                value={locale.info.title}
                apperiance="info"
            />
            <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyText}>
                    {locale.info.message}
                </Text>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.buttonContainer}>
            <Button
                apperience={ButtonApperiance.GRAY}
                value={locale.newAppeal}
                onClick={() => navigation.navigate(ROUTES.APPEALS_CATEGORIES)}
            />
        </View>
    );

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <View style={styles.container}>
                {!loading && (
                    <FlatList
                        data={appeals}
                        renderItem={renderAppeal}
                        initialNumToRender={10}
                        ListEmptyComponent={renderInfo()}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={renderFooter()}
                    />
                )}
            </View>
        </MainLayout>
    );
};

export default UserAppealsScreen;
