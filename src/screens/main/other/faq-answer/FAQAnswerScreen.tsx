import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { LoanRequestButton, HtmlView } from '../../../../core/components';
import locale from './locale';
import styles from './styles';

const FAQAnswerScreen = () => {
    const route = useRoute<OtherStackScreenProps<ROUTES.FAQ_ANSWER>['route']>();
    const { question, answer } = route.params;

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View style={styles.container}>
                    <Text style={styles.question}>{question.trim()}</Text>
                    <HtmlView html={answer} />
                    <LoanRequestButton />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(FAQAnswerScreen);
