import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useRegistrationStore } from '../../../store';
import { RegistrationData } from '../../../core';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import RegistrationForm from '../../../core/components/forms/registration-form';
import locale from './locale';

const RegistrationScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION>['navigation']>();
    const store = useRegistrationStore();

    const onSubmit = async (data: RegistrationData) => {
        try {
            const success = await store.signUp(data);

            if (success) {
                navigation.navigate(ROUTES.REGISTRATION_DOCUMENTS);
            }
        } catch (e) {}
    };

    return (
        <RegistrationLayout title={locale.formTitle}>
            <RegistrationForm errors={store.errors} onSubmit={onSubmit} />
        </RegistrationLayout>
    );
};

export default observer(RegistrationScreen);
