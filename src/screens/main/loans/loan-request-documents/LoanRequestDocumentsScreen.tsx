import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useLoanStore } from '../../../../store';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { getLoanRequestConfirm, postLoanRequest } from '../../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { SmsConfirmationTypes } from '../../../../core/enums';
import { Button, Checkbox, ErrorMessage, Icon } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const LoanRequestDocumentsScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_REQUEST_DOCUMENTS>['navigation']>();
    const { config, loanRequest } = useLoanStore();
    const [loading, setLoading] = useState(false);
    const [userAgree, setUserAgree] = useState(true);
    const [error, setError] = useState('');

    const onSubmit = async () => {
        if (!loanRequest) {
            return;
        }

        setLoading(true);

        try {
            const { status } = await postLoanRequest({ ...loanRequest });

            if (status === 200) {
                const response = await getLoanRequestConfirm();

                if (response.data) {
                    navigation.navigate(ROUTES.SMS_CONFIRMATION, {
                        type: SmsConfirmationTypes.REQUEST,
                        phone: response.data.clientPhoneNumber,
                        document: response.data.offerDocumentDownloadHref,
                        doubleCode: response.data.doubleCode
                    });
                } else {
                    setError(GLOBAL_ERROR_TEXT);
                }
            } else {
                setError(GLOBAL_ERROR_TEXT);
            }
        } catch (err) {
            // ignore
        } finally {
            setLoading(false);
        }
    };

    const renderDocuments = () => {
        const { documents = [] } = config || {};

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
                    <View style={styles.documentsContainer}>
                        {renderDocuments()}
                    </View>
                    <View style={styles.controlContainer}>
                        <Checkbox
                            value={userAgree}
                            onChange={setUserAgree}
                            label={locale.checkbox}
                        />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Button
                            value={locale.submit}
                            disabled={!userAgree}
                            onClick={onSubmit}
                        />
                    </View>
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanRequestDocumentsScreen);
