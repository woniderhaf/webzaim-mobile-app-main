import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { HtmlView, LoanRequestButton, DocumentList } from '../../../../core/components';
import locale from './locale';
import styles from './styles';

const AppDocument = () => {
    const navigation = useNavigation<OtherStackScreenProps<ROUTES.APP_DOCUMENT>['navigation']>();
    const route = useRoute<OtherStackScreenProps<ROUTES.APP_DOCUMENT>['route']>();
    const { document } = route.params;

    const description = useMemo(() => {
        return document.description
            ? <HtmlView html={document.description} />
            : null;

    }, [document.description]);

    const documents = useMemo(() => {
        return document.documents.map((doc) => ({
            title: doc.title || doc.file.name,
            onPress: () => navigation.navigate(ROUTES.DOCUMENT, { url: doc.file.url })
        }));
    }, [document.documents]);

    return (
        <MainLayout
            theme="gray"
            header={{
                title: document.title || locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                <View>
                    <Text style={styles.title}>{document.title}</Text>
                    {description}
                    <DocumentList data={documents} />
                </View>
                <LoanRequestButton />
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(AppDocument);
