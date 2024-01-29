import React, { useRef, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout/ScrollViewLayout';
import { useAuthStore, useUserStore } from '../../../store';
import { Button, ErrorMessage, Input, SecurityInput } from '../../../core/ui';
import {
    loginValidator,
    phoneCodeReplacer,
    isPhone as isPhoneValidate,
    PHONE_MASK,
    requiredValidator,
    getUserRegistrationStep
} from '../../../core/utils';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import { FastLoginActions } from '../../../core/enums';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import useForm from '../../../core/hooks/useForm';
import { WebzaimApi, getUserProfile, postLogin, getUserCurrent } from '../../../core/api';
import locale from './locale';
import styles from './styles';

const logo = require('../../../../assets/images/logo-full.png');

const FIRST_PHONE_LETTERS = ['7', '+7', '8', '9'];

enum FORM_FIELDS {
    LOGIN = 'login',
    PASSWORD = 'password'
}

const LoginScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.LOGIN>['navigation']>();
    const store = useAuthStore();
    const userStore = useUserStore();
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [isPhone, setIsPhone] = useState(store.userLogin && isPhoneValidate(store.userLogin));
    const input = useRef<TouchableOpacity>(null);

    const form = {
        [FORM_FIELDS.LOGIN]: {
            name: FORM_FIELDS.LOGIN,
            value: store.userLogin,
            validators: [requiredValidator(), loginValidator()]
        },
        [FORM_FIELDS.PASSWORD]: {
            name: FORM_FIELDS.PASSWORD,
            value: store.userPassword || '',
            validators: [requiredValidator()]
        }
    };

    const onSubmit = async () => {
        setGlobalError('');
        setLoading(true);

        try {
            const $password = data[FORM_FIELDS.PASSWORD].value;
            let $login = data[FORM_FIELDS.LOGIN].value;

            /**
             * Т.к. бэкенд принимает телефон только с +7,
             * а вводить пользователю разрешили как с +7 так и с 8
             * заменяет 8 на +7
             */
            if (isPhoneValidate($login)) {
                $login = phoneCodeReplacer($login);
            }

            const response = await postLogin($login, $password);

            if (response.data) {
                const token = response.data.token;

                WebzaimApi.token(token);

                await store.login($login, $password, token);

                const profileResponse = await getUserProfile();
                const userCurrentResponse = await getUserCurrent();

                if (profileResponse.data && userCurrentResponse.data) {
                    userStore.setUser(profileResponse.data);
                    Keyboard.dismiss();
                    navigation.navigate(ROUTES.FAST_LOGIN, {
                        action: store.pinCode ? FastLoginActions.ENTER : FastLoginActions.CREATE,
                        backUrl: getUserRegistrationStep({
                            ...profileResponse.data,
                            ...userCurrentResponse.data
                        })
                    });
                } else {
                    navigation.navigate(ROUTES.ERROR_500);
                }
            } else {
                setGlobalError(response.status === 500 ? GLOBAL_ERROR_TEXT : locale.form.error);
            }
        } catch (error) {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    const [data, onChange, onSubmitForm] = useForm(form, onSubmit);

    const checkIsPhone = (value: string): boolean => {
        return (
            (value.length === 1 && FIRST_PHONE_LETTERS.includes(value))
            || (value.length === 2 && FIRST_PHONE_LETTERS.includes(value))
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

    const signUp = () => {
        Keyboard.dismiss();
        navigation.navigate(ROUTES.REGISTRATION_VARIANTS);
    };

    const goToRecovery = () => {
        Keyboard.dismiss();
        navigation.navigate(ROUTES.RECOVER_LOGIN);
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
                    <View style={styles.logo}>
                        <Image source={logo} resizeMode="contain" />
                    </View>
                    <View>
                        {globalError.length > 0 && <ErrorMessage message={globalError} />}
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
                        <View style={styles.topIndent}>
                            <SecurityInput
                                label={locale.form.password}
                                value={data[FORM_FIELDS.PASSWORD].value}
                                error={data[FORM_FIELDS.PASSWORD].error}
                                onChange={(value) => onChange(FORM_FIELDS.PASSWORD, value)}
                                trim
                            />
                        </View>
                        <View style={styles.linkContainer}>
                            <TouchableOpacity onPress={goToRecovery}>
                                <Text style={styles.link}>{locale.form.forgotPassword}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Button value={locale.form.submit} onClick={onSubmitForm} />
                    <Button value={locale.form.registration} onClick={signUp} secondary style={styles.topIndent} />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoginScreen);
