import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore } from '../../../../store';
import { IFAQCategory, IFAQCategoryItem } from '../../../../core/interfaces';
import { LoanRequestButton } from '../../../../core/components';
import { ButtonLink, Icon, SlideDown } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const FAQScreen = () => {
    const { faq, fetchFAQ } = useCommonStore();
    const { loading } = useUIStore();
    const navigation = useNavigation<OtherStackScreenProps<ROUTES.FAQ>['navigation']>();

    useEffect(() => {
        (async () => {
            if (!faq.length) {
                await fetchFAQ();
            }
        })();
    }, []);

    const renderCategory = useCallback(({ item }: { item: IFAQCategory }) => {
        return (
            <SlideDown
                containerStyles={styles.sliderContainerStyles}
                bodyStyles={styles.sliderBodyStyles}
                buttonContainerStyles={styles.sliderButtonContainer}
                renderCustomButton={(opened) => renderSliderCustomButton(opened, item.title)}
            >
                <View style={styles.questionsContainerStyles}>
                    {item.questions.map(renderQuestion)}
                </View>
            </SlideDown>
        );
    }, []);

    const renderQuestion = useCallback(({ id, question, answer }: IFAQCategoryItem) => {
        return (
            <View key={id} style={styles.questionLinkContainer}>
                <ButtonLink
                    onPress={() => navigation.navigate(ROUTES.FAQ_ANSWER, { question, answer })}
                    text={question.trim()}
                    textStyle={styles.questionLink}
                />
            </View>
        );
    }, []);

    const renderSliderCustomButton = useCallback((opened, label) => (
        <View style={styles.sliderButton}>
            <View style={styles.labelContainer}>
                <Text style={[styles.label, opened && styles.labelOpened]}>{label}</Text>
            </View>
            <View>
                <Icon name={opened ? 'angleUp' : 'angleDown'} size={20} />
            </View>
        </View>
    ), []);

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
                    data={faq}
                    renderItem={renderCategory}
                    ItemSeparatorComponent={null}
                    initialNumToRender={10}
                    keyExtractor={(i) => i.id}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={loading ? null : LoanRequestButton}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </MainLayout>
    );
};

export default observer(FAQScreen);
