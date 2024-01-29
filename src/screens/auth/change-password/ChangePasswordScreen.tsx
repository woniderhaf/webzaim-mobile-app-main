import React, { useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { Button, ErrorMessage, SecurityInput } from '../../../core/ui';
import { compareValidator, requiredValidator } from '../../../core/utils';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import useForm from '../../../core/hooks/useForm';
import { useUIStore } from '../../../store';
import { postPasswordUpdate } from '../../../core/api';
import locale from './locale';

enum FORM_FIELDS {
    OLD_PASSOWRD = 'oldPassword',
    PASSOWRD = 'password',
    REPEAT_PASSWORD = 'repeatPassword'
}

const ChangePasswordScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.CHANGE_PASSWORD>['navigation']>();
    const { setModal } = useUIStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const form = {
        [FORM_FIELDS.OLD_PASSOWRD]: {
            name: FORM_FIELDS.OLD_PASSOWRD,
            value: '',
            validators: [requiredValidator()]
        },
        [FORM_FIELDS.PASSOWRD]: {
            name: FORM_FIELDS.PASSOWRD,
            value: '',
            validators: [requiredValidator()]
        },
        [FORM_FIELDS.REPEAT_PASSWORD]: {
            name: FORM_FIELDS.REPEAT_PASSWORD,
            value: '',
            validators: [requiredValidator(), compareValidator(FORM_FIELDS.PASSOWRD, locale.form.error)]
        }
    };

    const onSubmit = async () => {
        setLoading(true);

        try {
            const params = {
                oldPassword: data[FORM_FIELDS.OLD_PASSOWRD].value,
                newPassword: data[FORM_FIELDS.PASSOWRD].value
            };

            const { status, errors } = await postPasswordUpdate(params);

            if (status === 200) {
                setModal({
                    title: locale.successModal.title,
                    buttons: [
                        {
                            label: locale.successModal.submit,
                            onPress: () => {
                                setModal(null);
                                navigation.goBack();
                            }
                        }
                    ]
                });
            } else {
                // @TODO
                const err = errors && errors?.wrongPassword || GLOBAL_ERROR_TEXT;

                // @ts-ignore
                setError(err);
            }
        } catch {
            setError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const [data, onChange, onSubmitForm] = useForm(form, onSubmit);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                <View>
                    {error.length > 0 && <ErrorMessage message={error} />}
                    <View>
                        <SecurityInput
                            value={data[FORM_FIELDS.OLD_PASSOWRD].value}
                            trim
                            error={data[FORM_FIELDS.OLD_PASSOWRD].error}
                            label={locale.form.oldPassowrs}
                            onChange={(value) => onChange(FORM_FIELDS.OLD_PASSOWRD, value)}
                        />
                    </View>
                    <View>
                        <SecurityInput
                            value={data[FORM_FIELDS.PASSOWRD].value}
                            trim
                            error={data[FORM_FIELDS.PASSOWRD].error}
                            label={locale.form.newPassword}
                            onChange={(value) => onChange(FORM_FIELDS.PASSOWRD, value)}
                        />
                    </View>
                    <View>
                        <SecurityInput
                            value={data[FORM_FIELDS.REPEAT_PASSWORD].value}
                            trim
                            error={data[FORM_FIELDS.REPEAT_PASSWORD].error}
                            label={locale.form.repeatPassword}
                            onChange={(value) => onChange(FORM_FIELDS.REPEAT_PASSWORD, value)}
                        />
                    </View>
                </View>
                <View>
                    <Button
                        value={locale.form.submit}
                        onClick={onSubmitForm}
                    />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(ChangePasswordScreen);
