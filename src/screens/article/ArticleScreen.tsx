import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../core/layouts/main-layout';
import ScrollViewLayout from '../../core/layouts/scroll-view-layout';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { useLoanStore, useRootStore } from '../../store';
import { Button } from '../../core/ui';
import styles from './styles';

const ArticleScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.ARTICLE>['navigation']>();
    const { article, setArticle } = useRootStore();
    const { activeLoan } = useLoanStore();

    useEffect(() => {
        return () => {
            setArticle(undefined);
        };
    });

    const onLoanRequest = () => {
        navigation.navigate(
            ROUTES.MAIN,
            {
                screen: ROUTES.LOANS_STACK,
                params: {
                    screen: ROUTES.USER_LOANS
                }
            }
        );
    };

    return (
        <MainLayout
            theme="gray"
            header={{
                title: article?.title || '',
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                {Boolean(article) && (
                    <>
                        <View>
                            <View style={styles.imageContainer} />
                            <View style={styles.body}>
                                <Text style={styles.date}>{article?.date}</Text>
                                <Text style={styles.title}>{article?.title}</Text>
                                {article?.description.map((item, index) => (
                                    <Text key={String(index)} style={styles.text}>{item}</Text>
                                ))}
                            </View>
                        </View>
                        {!activeLoan && (
                            <View>
                                <Button value="Оформить займ" onClick={onLoanRequest} />
                            </View>
                        )}
                    </>
                )}
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(ArticleScreen);
