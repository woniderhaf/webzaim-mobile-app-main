import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { IAppealForm } from '../../../../core/interfaces';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { useUIStore } from '../../../../store';
import { getAppealFields, postAppealFields } from '../../../../core/api';
import { AppealForm } from '../../../../core/components';
import { ErrorMessage } from '../../../../core/ui';
import locale from './locale';

const AppealCreateScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.APPEAL_CREATE>['navigation']>();
    const route = useRoute<ProfileScreenProps<ROUTES.APPEAL_CREATE>['route']>();
    const { setModal } = useUIStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [form, setForm] = useState<IAppealForm>();

    const { type } = route.params || {};

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        setLoading(true);

        try {
            const response = await getAppealFields(type);

            if (response.data) {
                setForm(response.data);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: Record<string, any>) => {
        setLoading(true);

        try {
            const response = await postAppealFields(type, values);

            if (response.status === 200) {
                setModal({
                    title: locale.successModal.title,
                    buttons: [
                        {
                            label: locale.successModal.button,
                            onPress: () => {
                                setModal(null);
                                navigation.replace(ROUTES.PROFILE_LIST);
                            }
                        }
                    ]
                });
            }
        } catch {
            setError(true);
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
                    {error && !loading && (
                        <ErrorMessage message={GLOBAL_ERROR_TEXT} />
                    )}
                    {form && (
                        <AppealForm data={form} onSubmit={onSubmit} />
                    )}
                </>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default AppealCreateScreen;
