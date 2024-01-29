import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore, useUserStore } from '../../../../store';
import { IAppDocument } from '../../../../core/interfaces';
import { DocumentList, LoanRequestButton } from '../../../../core/components';
import locale from './locale';
import styles from './styles';

const AppDocumentsListScreen = () => {
    const { documents, fetchDocuments } = useCommonStore();
    const { loading } = useUIStore();
    const { isTestUser } = useUserStore();
    const navigation = useNavigation<OtherStackScreenProps<ROUTES.APP_DOCUMENTS_LIST>['navigation']>();
    const [documentList, setDocumentList] = useState<typeof documents>([]);

    useEffect(() => {
        (async () => {
            if (!documents.length) {
                await fetchDocuments();
            }
        })();
    }, []);

    /**
     * @description Убираем для тестового пользователя раздел документов
     * id = 30
     */
    useEffect(() => {
        if (documents.length > 0) {
            let list = documents;

            if (isTestUser()) {
                list = list.filter(documentItem => documentItem.id !== 30);
            }
            setDocumentList(list);
        }
    }, [documents]);

    const onDocumentClick = useCallback((item: IAppDocument) => {
        /**
         * Если в documents только один документ И поле description пусто,
         * то отображается просто ссылка на этот документ.
         * Иначе (то есть несколько документов ИЛИ есть description)
         * эта ссылка ведет на отдельный экран,
         * внутри которого описание/description (если есть) и список документов из documents.
         * */
        if (item.description || item.documents.length > 1) {
            navigation.navigate(ROUTES.APP_DOCUMENT, { document: item });
        } else if (item.documents[0]) {
            navigation.navigate(ROUTES.DOCUMENT, {
                url: item.documents[0].file.url
            });
        }
    }, []);

    const renderDocument = useCallback(({ item }: { item: IAppDocument }) => {
        return <DocumentList.Item title={item.title} onPress={() => onDocumentClick(item)} />;
    }, []);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}>
            <View style={styles.container}>
                <FlatList
                    data={documentList}
                    renderItem={renderDocument}
                    ItemSeparatorComponent={null}
                    initialNumToRender={10}
                    keyExtractor={i => i.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={loading ? null : LoanRequestButton}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </MainLayout>
    );
};

export default observer(AppDocumentsListScreen);
