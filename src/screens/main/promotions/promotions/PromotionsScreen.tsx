import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { PromotionsStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore } from '../../../../store';
import { LoanRequestButton } from '../../../../core/components';
import { IPromotion } from '../../../../core/interfaces';
import locale from './locale';
import styles from './styles';

const PromotionsScreen = () => {
    const { promotions, fetchPromotions } = useCommonStore();
    const { loading } = useUIStore();
    const navigation = useNavigation<PromotionsStackScreenProps<ROUTES.PROMOTIONS>['navigation']>();

    useEffect(() => {
        (async () => {
            if (!promotions.length) {
                await fetchPromotions();
            }
        })();
    }, []);

    const renderPromoPreview = useCallback(({ item }: { item: IPromotion }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ROUTES.PROMOTION, { id: item.slug });
                }}
            >
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: item.image?.url }}
                        style={styles.image}
                        resizeMode={'cover'}
                    />
                    <View style={styles.previewTitleContainer}>
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
                title: locale.screenTitle
            }}
        >
            <View style={styles.container}>
                <FlatList
                    data={promotions}
                    renderItem={renderPromoPreview}
                    ItemSeparatorComponent={null}
                    initialNumToRender={10}
                    keyExtractor={(i) => i.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ListFooterComponent={loading ? null : <LoanRequestButton />}
                />
            </View>
        </MainLayout>
    );
};

export default observer(PromotionsScreen);
