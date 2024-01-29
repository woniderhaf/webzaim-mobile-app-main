import React, { useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import format from 'date-fns/format';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout/ScrollViewLayout';
import { useAuthStore, useUIStore } from '../../../store';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { postPasswordRestore } from '../../../core/api';
import { Button, ErrorMessage, Input } from '../../../core/ui';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import {
    dateToUTC,
    loginValidator,
    isPhone as isPhoneValidate,
    PHONE_MASK,
    requiredValidator
} from '../../../core/utils';
import useForm from '../../../core/hooks/useForm';
import locale from './locale';
import styles from './styles';

const logo = require('../../../../assets/images/logo-full.png');

const FIRST_PHONE_LETTERS = ['7', '+7', '8', '9'];

enum FORM_FIELDS {
    LOGIN = 'login',
    BIRTHDATE = 'birthDate'
}

const RecoverPasswordScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.RECOVER_LOGIN>['navigation']>();
    const { setModal } = useUIStore();
    const store = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [datePickerOpened, setDatePickerOpened] = useState(false);
    const [error, setGlobalError] = useState('');
    const [isPhone, setIsPhone] = useState(store.userLogin && isPhoneValidate(store.userLogin));
    const input = useRef<TouchableOpacity>(null);

    const form = {
        [FORM_FIELDS.LOGIN]: {
            name: FORM_FIELDS.LOGIN,
            value: store.userLogin,
            validators: [requiredValidator(), loginValidator()]
        },
        [FORM_FIELDS.BIRTHDATE]: {
            name: FORM_FIELDS.BIRTHDATE,
            value: '',
            validators: [requiredValidator()]
        }
    };

    const onSubmit = async () => {
        setLoading(true);

        try {
            const { status } = await postPasswordRestore(
                data[FORM_FIELDS.LOGIN].value,
                dateToUTC(data[FORM_FIELDS.BIRTHDATE].value)
            );

            if (status === 200) {
                setModal({
                    title: locale.successModal.title,
                    message: locale.successModal.message,
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
                setGlobalError(status === 500 ? GLOBAL_ERROR_TEXT : locale.form.error);
            }
        } catch (e) {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const onCancel = () => navigation.goBack();

    const onChangeBirthDate = (date: Date) => {
        setDatePickerOpened(false);
        onChange(FORM_FIELDS.BIRTHDATE, date);
    };

    const [data, onChange, onSubmitForm, setError] = useForm(form, onSubmit);

    const checkIsPhone = (value: string): boolean => {
        return (
            (value.length === 1 && FIRST_PHONE_LETTERS.includes(value)) ||
            (value.length === 2 && FIRST_PHONE_LETTERS.includes(value))
        );
    };

    const onChangeLogin = (value: string) => {
        let $value = value.trim().replace(/[()\s]/g, '');

        if (checkIsPhone($value)) {
            setIsPhone(true);

            onChange(FORM_FIELDS.LOGIN, value === '9' ? '+79' : '+7');

            setTimeout(() => {
                input.current?.focus();
            });
        } else {
            onChange(FORM_FIELDS.LOGIN, $value);

            if (isPhone && !$value) {
                setIsPhone(false);
                setTimeout(() => {
                    input.current?.focus();
                });
            }
        }
    };

    return (
        <MainLayout
            theme="gray"
            edges={['top', 'bottom']}
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout>
                <View>
                    <View>
                        <View style={styles.logo}>
                            <Image source={logo} resizeMode="contain" />
                        </View>
                        {error.length > 0 && <ErrorMessage message={error} />}
                        <View>
                            <Input
                                ref={input}
                                label={locale.form.login}
                                value={data[FORM_FIELDS.LOGIN].value}
                                error={data[FORM_FIELDS.LOGIN].error}
                                onChange={onChangeLogin}
                                trim
                                masked
                                type={isPhone ? 'phone-pad' : 'default'}
                                mask={isPhone ? PHONE_MASK : undefined}
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setDatePickerOpened(true)}>
                                <View>
                                    <Input
                                        label={locale.form.birthdate}
                                        value={
                                            data[FORM_FIELDS.BIRTHDATE].value
                                                ? format(data[FORM_FIELDS.BIRTHDATE].value, 'dd.MM.yyyy')
                                                : ''
                                        }
                                        error={data[FORM_FIELDS.BIRTHDATE].error}
                                        onChange={() => {}}
                                        onPress={() => setDatePickerOpened(true)}
                                        style={[styles.diabledInput]}
                                        disabled
                                    />
                                </View>
                            </TouchableOpacity>
                            <DatePicker
                                date={data[FORM_FIELDS.BIRTHDATE].value || new Date()}
                                title={locale.form.birthdate}
                                locale="ru"
                                open={datePickerOpened}
                                modal
                                mode="date"
                                onConfirm={onChangeBirthDate}
                                onCancel={() => setDatePickerOpened(false)}
                                confirmText={locale.form.datepicker.confirmText}
                                cancelText={locale.form.datepicker.cancelText}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Button value={locale.form.submit} onClick={onSubmitForm} />
                    <Button value={locale.form.cancel} onClick={onCancel} secondary style={styles.topIndent} />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(RecoverPasswordScreen);
