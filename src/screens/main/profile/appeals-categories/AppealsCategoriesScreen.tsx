import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { getAppealsCategories } from '../../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { IAppealsCategory } from '../../../../core/interfaces';
import { ButtonList, ErrorMessage } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const AppealsCategoriesScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.APPEALS_CATEGORIES>['navigation']>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState<Array<IAppealsCategory>>([]);

    useEffect(() => {
        fetchUserAppeals();
    }, []);

    const fetchUserAppeals = async () => {
        setLoading(true);

        try {
            const response = await getAppealsCategories();

            if (response.data) {
                setCategories(response.data);
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const onPressCategory = (category: IAppealsCategory) => {
        navigation.navigate(
            ROUTES.APPEALS_LIST,
            {
                id: category.id,
                title: category.title,
                appeals: category.appeals
            }
        );
    };

    const renderCategories = useMemo(() => {
        return categories.map((category) => (
            <View key={category.id} style={styles.btn}>
                <ButtonList
                    title={category.title}
                    onPress={() => onPressCategory(category)}
                />
            </View>
        ));
    }, [categories]);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>
                    {error && !loading && (
                        <ErrorMessage message={GLOBAL_ERROR_TEXT} />
                    )}
                    {renderCategories}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default AppealsCategoriesScreen;
