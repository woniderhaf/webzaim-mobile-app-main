import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { postUserPaymentMethodsBank } from '../../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { Button, ErrorMessage, InfoText, Input } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

// @TODO useForm

const LoanRequestAddBankScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_REQUEST_ADD_BANK>['navigation']>();
    const [loading, setLoading] = useState(false);
    const [bic, setBic] = useState(''); // 043601607
    const [bicError, setBicError] = useState('');
    const [account, setAccount] = useState(''); // 30101810200000000607
    const [accountError, setAccountError] = useState('');
    const [error, setError] = useState<string | undefined>();

    const onSubmit = async () => {
        let $bicError;
        let $accountError;

        if (!bic) {
            $bicError = locale.form.errorRequire;
        } else if (bic.length < 9) {
            $bicError = locale.form.errorBic;
        }

        if (!account) {
            $accountError = locale.form.errorRequire;
        } else if (account.length < 20) {
            $accountError = locale.form.errorAccount;
        }

        if ($bicError || $accountError) {
            setBicError($bicError || '');
            setAccountError($accountError || '');

            return;
        }

        setLoading(true);

        try {
            const { status } = await postUserPaymentMethodsBank({ bic, account });

            if (status === 200) {
                navigation.replace(ROUTES.LOAN_REQUEST_DOCUMENTS);
            } else if (status === 400) {
                setError(locale.form.error);
            } else {
                setError(GLOBAL_ERROR_TEXT);
            }
        } catch (error) {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
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
                <>
                    <View>
                        {error && <ErrorMessage message={error} />}
                        <Text style={styles.text}>{locale.title}</Text>
                        <View style={styles.controlContainer}>
                            <Input
                                value={bic}
                                error={bicError}
                                digitOnly
                                label={locale.form.bic}
                                onChange={setBic}
                            />
                        </View>
                        <View style={styles.controlContainer}>
                            <Input
                                value={account}
                                error={accountError}
                                digitOnly
                                label={locale.form.account}
                                onChange={setAccount}
                            />
                        </View>
                        <View style={styles.controlContainer}>
                            <InfoText value={locale.info} />
                        </View>
                    </View>
                    <View>
                        <Button
                            value={locale.form.submit}
                            onClick={onSubmit}
                            style={styles.topIndent}
                        />
                    </View>
                </>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanRequestAddBankScreen);
