import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore } from '../../../../store';
import { PostDate } from '../../../../core/components';
import { IPostPreview } from '../../../../core/interfaces';
import locale from './locale';
import styles from './styles';

const NewsScreen = () => {
    const { news, fetchNews } = useCommonStore();
    const { loading } = useUIStore();
    const navigation = useNavigation<OtherStackScreenProps<ROUTES.NEWS>['navigation']>();

    useEffect(() => {
        (async () => {
            if (!news.length) {
                await fetchNews();
            }
        })();
    }, []);

    const renderPostPreview = useCallback(({ item }: { item: IPostPreview }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.POST, { id: item.slug })}
            >
                <View style={styles.postPreviewContainer}>
                    <PostDate value={item.date} />
                    <View style={styles.postPreviewTitleContainer}>
                        <Text style={styles.title}>{item.title.trim()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, []);

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
                <FlatList
                    data={news}
                    renderItem={renderPostPreview}
                    ItemSeparatorComponent={null}
                    initialNumToRender={10}
                    keyExtractor={(i) => i.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </MainLayout>
    );
};

export default observer(NewsScreen);
