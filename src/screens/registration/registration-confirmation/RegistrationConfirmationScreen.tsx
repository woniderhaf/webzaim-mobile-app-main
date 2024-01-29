import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout';
import { NAVIGATION_LOGOUT_ACTION, RootStackScreenProps, ROUTES } from '../../../navigation';
import { useAuthStore, useRegistrationStore, useUIStore } from '../../../store';
import { SmsConfirmationForm } from '../../../core/components';
import { ButtonApperiance, FastLoginActions, SmsConfirmationTypes } from '../../../core/enums';
import { postRegistrationConfirmation } from '../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';
import { ErrorMessage } from '../../../core/ui';
import locale from './locale';

const RegistrationConfirmationScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_CONFIRMATION>['navigation']>();
    const { loading, setLoading, setModal } = useUIStore();
    const store = useRegistrationStore();
    const authStore = useAuthStore();
    const [globalError, setGlobalError] = useState('');

    useFocusEffect(
        useCallback(() => {
            /**
             * Когда у пользователя не подтверждена регистрация
             * то попадаем сразу на этот экран
             * поэтому данных может не быть
             * */
            if (!store.confirmation) {
                (async () => {
                    await store.getConfirmationRegistration();
                })();
            }

            return () => {
                store.setConfirmation(null);
                store.setGlobalError('');
                setGlobalError('');
            };
        }, [])
    );

    useEffect(() => {
        if (store.globalError) {
            setGlobalError(store.globalError);
        }
    }, [store.globalError]);

    const onChangePhone = () => {
        if (store.globalError) {
            navigation.pop(2);
        } else {
            setModal({
                title: locale.changePhoneModal.title,
                buttons: [
                    {
                        label: locale.changePhoneModal.successBtn,
                        apperiance: ButtonApperiance.WHITE,
                        onPress: () => {
                            setModal(null);
                            navigation.pop(2);
                        }
                    },
                    {
                        label: locale.changePhoneModal.cancelBtn,
                        onPress: () => setModal(null)
                    }
                ]
            });
        }
    };

    const onSubmit = useCallback(async (code: string) => {
        setLoading(true);

        try {
            const { status, message } = await postRegistrationConfirmation(code);

            if (status === 200) {
                navigation.navigate(ROUTES.FAST_LOGIN, {
                    validateSession: false,
                    action: FastLoginActions.CREATE,
                    backUrl: ROUTES.REGISTRATION_PASSPORT
                });
            } else if (status === 401) {
                /**
                 * backend может возвращать 401 на подтверждении
                 * хотя пользователь авторизован ¯\_(ツ)_/¯
                 * */
                setGlobalError(GLOBAL_ERROR_TEXT);

                setTimeout(() => {
                    navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
                }, 1000);
            } else {
                setGlobalError(message || GLOBAL_ERROR_TEXT);
            }
        } catch (e) {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    }, []);

    const onOfferDocument = useCallback(() => {
        const url = store?.confirmation?.helpDocumentHref || '';

        if (url) {
            navigation.navigate(ROUTES.DOCUMENT, { url, full: true });
        }
    }, []);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                onBackPress: onChangePhone
            }}
        >
            <ScrollViewLayout>
                <View>
                    {store.globalError ? (
                        <>
                            <ErrorMessage message={store.globalError} />
                        </>
                    ) : (
                        <SmsConfirmationForm
                            type={SmsConfirmationTypes.REGISTRATION}
                            error={globalError}
                            phone={store?.confirmation?.clientPhoneNumber || authStore.userLogin || ''}
                            doubleCode={Boolean(store?.confirmation?.doubleCode)}
                            onSubmit={onSubmit}
                            onDocumentPress={store?.confirmation?.helpDocumentHref ? onOfferDocument : undefined}
                            onCancel={onChangePhone}
                        />
                    )}
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(RegistrationConfirmationScreen);
