import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { useAuthStore, useRootStore } from '../../../../store';
import LocalStorage from '../../../../core/local-storage';
import { USER_APP_SETTINGS } from '../../../../core/constants';
import { FastLoginActions } from '../../../../core/enums';
import { IAppSettings } from '../../../../core/interfaces';
import { Button } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

const AppSettingsScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.APP_SETTINGS>['navigation']>();
    const { sensor } = useRootStore();
    const { userLogin, useBiometrics, setUseBiometrics } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<IAppSettings>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        let $settings: IAppSettings = await LocalStorage.getItem(USER_APP_SETTINGS);

        if (!$settings) {
            $settings = Platform.select<IAppSettings>({
                ios: { push: false },
                default: {}
            });

            if (sensor) {
                $settings[sensor] = useBiometrics;
            }
        }

        setSettings($settings);
        setLoading(false);
    };

    const saveSettings = async () => {
        setLoading(true);

        try {
            await LocalStorage.setItem(USER_APP_SETTINGS, settings);

            if (sensor) {
                setUseBiometrics(Boolean(settings[sensor]));
                await LocalStorage.updateItem(userLogin, { useBiometrics: settings[sensor] });
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleSetting = (key: keyof IAppSettings) => {
        setSettings(prevSettings => {
            return {
                ...prevSettings,
                [key]: !prevSettings[key]
            };
        });
    };

    const changePincode = () => {
        navigation.navigate(ROUTES.FAST_LOGIN, { action: FastLoginActions.CHANGE });
    };

    const renderSettings = useMemo(() => {
        const locales = locale.settings as Record<string, string>;

        return Object.keys(settings).map((key) => {
            return (
                <View key={key} style={styles.button}>
                    <Text style={styles.label}>{locales[key]}</Text>
                    <Switch
                        trackColor={{ false: '#c5c5c5', true: '#95abdc' }}
                        thumbColor={settings[key as keyof IAppSettings] ? '#2B56B9' : '#F1F1F1'}
                        ios_backgroundColor="#c5c5c5"
                        onValueChange={() => toggleSetting(key as keyof IAppSettings)}
                        value={settings[key as keyof IAppSettings]}
                    />
                </View>
            );
        });
    }, [settings]);

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
                <View>
                    {renderSettings}
                    <TouchableOpacity onPress={changePincode}>
                        <Text style={styles.label}>{locale.settings.pincode}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button value={locale.save} onClick={saveSettings} />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default AppSettingsScreen;
