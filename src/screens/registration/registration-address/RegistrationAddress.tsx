import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useRegistrationStore, useUIStore } from '../../../store';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import RegistrationAddressForm from '../../../core/components/forms/registration-address-form';
import { patchUserProfile } from '../../../core/api';
import { IUserProfile } from '../../../core/interfaces';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';

const RegistrationAddressScreen = () => {
    const { errors, setGlobalError } = useRegistrationStore();
    const { setLoading } = useUIStore();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_ADDRESS>['navigation']>();

    const onSubmit = async (addresses: Partial<IUserProfile>) => {
        setLoading(true);

        try {
            const { status } = await patchUserProfile(addresses);

            if (status === 200) {
                navigation.navigate(ROUTES.REGISTRATION_ADDITIONAL_DATA);
            } else {
                setGlobalError(GLOBAL_ERROR_TEXT);
            }
        } catch (e) {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegistrationLayout>
            <RegistrationAddressForm errors={errors} onSubmit={onSubmit} />
        </RegistrationLayout>
    );
};

export default observer(RegistrationAddressScreen);
