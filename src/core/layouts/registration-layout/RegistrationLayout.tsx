import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../core/layouts/scroll-view-layout';
import { useRegistrationStore, useUIStore } from '../../../store';
import { RegistrationHeader } from '../../../core/components';
import { ErrorMessage } from '../../../core/ui';
import { ROUTES } from '../../../navigation';
import locale from './locale';
import styles from './styles';

type RegistrationLayoutProps = {
    children: React.ReactNode;
    footerComponent?: React.ReactNode;
    title?: string;
    topShift?: number;
};

const RegistrationLayout = ({ children, title, topShift, footerComponent }: RegistrationLayoutProps) => {
    const store = useRegistrationStore();
    const { loading } = useUIStore();
    const navigation = useNavigation();
    const router = useRoute();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                if (store.step.id !== router.name && store.steps[router.name]) {
                    store.setStep(store.steps[router.name]);
                }

                if (!store.config) {
                    await store.fetchRegistrationConfig();
                }
            })();

            return () => {
                if (store.globalError) {
                    store.setGlobalError('');
                }
            };
        }, [store, router])
    );

    const hasBackButton = useMemo(() => {
        switch (store.step.id) {
            case ROUTES.REGISTRATION_PASSPORT:
            case ROUTES.REGISTRATION_LOAN_REQUEST: {
                return false;
            }
            default:
                return true;
        }
    }, [store.step]);

    return (
        <MainLayout
            contrast
            loading={loading}
            theme="blue"
            header={{
                title: locale.screenTitle,
                backButtonShow: hasBackButton,
                onBackPress: hasBackButton ? () => navigation.goBack() : () => {}
            }}
        >
            <View style={styles.container}>
                <ScrollViewLayout bounces={false} disableHorizontalIndent disableBottomIndent disableTopIndent>
                    <View>
                        <RegistrationHeader step={store.step} steps={store.steps} bottomPadding={topShift} />
                    </View>
                    <View style={[styles.form]}>
                        {Boolean(title) && <Text style={styles.formTitle}>{title}</Text>}
                        {Boolean(store.globalError) && <ErrorMessage message={store.globalError} />}
                        {children}
                    </View>
                </ScrollViewLayout>
                {footerComponent}
            </View>
        </MainLayout>
    );
};

export default observer(RegistrationLayout);
