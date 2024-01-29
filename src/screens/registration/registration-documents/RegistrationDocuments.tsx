import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout';
import { useRegistrationStore, useUserStore } from '../../../store';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { Button, Checkbox, ErrorMessage, Icon } from '../../../core/ui';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import { FastLoginActions } from '../../../core/enums';
import { getUserCurrent, getUserProfile } from '../../../core/api';
import locale from './locale';
import styles from './styles';

const RegistrationDocumentsScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_DOCUMENTS>['navigation']>();
    const store = useRegistrationStore();
    const { userExternal, setUser } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [userAgree, setUserAgree] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        /**
         * на submit запрашиваем смс код подтверждения
         * и если данные пришли, то редирект на экран подтверждения
         * */
        if (store.confirmation) {
            navigation.navigate(ROUTES.REGISTRATION_CONFIRMATION);
        }
    }, [store.confirmation]);

    const onSubmit = async () => {
        setLoading(true);

        try {
            const { data: userCurrent } = await getUserCurrent();

            if (userCurrent?.isConfirmed) {
                const { data: userProfile } = await getUserProfile();

                userProfile && setUser(userProfile);
                userExternal &&
                    navigation.navigate(ROUTES.FAST_LOGIN, {
                        validateSession: false,
                        action: FastLoginActions.CREATE,
                        backUrl: ROUTES.REGISTRATION_PASSPORT
                    });
            } else {
                await store.getConfirmationRegistration();
            }
        } catch (err) {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const renderDocuments = () => {
        const { documents = [] } = store.config || {};

        return documents.map((doc, index) => (
            <TouchableOpacity
                key={JSON.stringify(doc)}
                style={[styles.document, { marginTop: index > 0 ? 20 : 0 }]}
                onPress={() => doc.href && navigation.navigate(ROUTES.DOCUMENT, { url: doc.href })}
            >
                <View style={styles.documentIcon}>
                    <Icon name="documentCircle" size={34} />
                </View>
                <Text style={styles.documentName}>{doc.title}</Text>
            </TouchableOpacity>
        ));
    };

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
                    {error.length > 0 && <ErrorMessage message={error} />}
                    <View style={styles.documentsContainer}>{renderDocuments()}</View>
                    <View style={styles.controlContainer}>
                        <Checkbox value={userAgree} onChange={setUserAgree} label={locale.checkbox} />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Button value={locale.submit} disabled={!userAgree} onClick={onSubmit} />
                    </View>
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(RegistrationDocumentsScreen);
