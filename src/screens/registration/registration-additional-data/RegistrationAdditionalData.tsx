import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useDictionaryStore, useRegistrationStore, useUIStore } from '../../../store';
import RegistrationLayout from '../../../core/layouts/registration-layout';
import RegistrationAdditionalDataForm from '../../../core/components/forms/registration-additional-data-form';
import { patchUserProfile } from '../../../core/api';
import { IUserProfile } from '../../../core/interfaces';
import { GLOBAL_ERROR_TEXT } from '../../../core/constants';

const RegistrationAdditionalDataScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_ADDITIONAL_DATA>['navigation']>();
    const { errors, setGlobalError } = useRegistrationStore();
    const dictionaryStore = useDictionaryStore();
    const { setLoading } = useUIStore();

    /**
     *  Загрузка словарей для selectbox
     *  (Доход, семейное положение и т.п.)
     */
    const fetchDictionary = async () => {
        setLoading(true);

        try {
            await dictionaryStore.fetchDictionary();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!dictionaryStore.dictionary) {
            fetchDictionary();
        }
    }, []);

    const onSubmit = async (additionalData: Partial<IUserProfile>) => {
        setLoading(true);

        try {
            const { status } = await patchUserProfile(additionalData);

            if (status === 200) {
                navigation.reset({ routes: [{ name: ROUTES.REGISTRATION_LOAN_REQUEST }] });
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
            <RegistrationAdditionalDataForm errors={errors} onSubmit={onSubmit} />
        </RegistrationLayout>
    );
};

export default observer(RegistrationAdditionalDataScreen);
