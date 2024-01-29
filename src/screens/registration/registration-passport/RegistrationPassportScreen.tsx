import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useRegistrationStore, useUIStore, useUserStore } from '../../../store';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import RegistrationPassportForm from '../../../core/components/forms/registration-passport-form';
import { REG_PASSPORT_FORM } from '../../../core/enums';
import { patchUserProfile } from '../../../core/api';
import { IUserPassport } from '../../../core/interfaces';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';

const RegistrationPassportScreen = () => {
    const { errors, setGlobalError, regForm } = useRegistrationStore();
    const { user } = useUserStore();
    const { setLoading, loading } = useUIStore();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_PASSPORT>['navigation']>();

    const onSubmit = async (data: IUserPassport) => {
        setLoading(true);

        try {
            /**
             * серия и паспорт на форме в одном поле с маской {ххх ххххх},
             * а api принимает в разных свойствах
             * */
            const [series, number] = data[REG_PASSPORT_FORM.NUMBER].split(' ');
            const passport = {
                ...data,
                number,
                series
            };

            const { status, message } = await patchUserProfile({ passport });

            if (status === 200) {
                navigation.navigate(ROUTES.REGISTRATION_ADDRESS);
            } else if (message) {
                setGlobalError(message);
            }
        } catch (e) {
            setGlobalError(GLOBAL_ERROR_TEXT);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegistrationLayout>
            <RegistrationPassportForm
                disabled={loading}
                regForm={regForm}
                user={user}
                errors={errors}
                onSubmit={onSubmit}
            />
        </RegistrationLayout>
    );
};

export default observer(RegistrationPassportScreen);
