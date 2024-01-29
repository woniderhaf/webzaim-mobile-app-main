import React, { useEffect } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useUserStore, useDictionaryStore, useUIStore } from '../../../../store';
import { ProfileScreenProps, ROUTES } from '../../../../navigation';
import { IUserProfile } from '../../../../core/interfaces';
import { ButtonApperiance } from '../../../../core/enums';
import { UserProfileForm } from '../../../../core/components';
import { ErrorMessage, InfoText } from '../../../../core/ui';
import { clearPhoneMask } from '../../../../core/utils';
import { getUserProfile } from '../../../../core/api';
import locale from './locale';
import styles from './styles';

const UserProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenProps<ROUTES.USER_PROFILE>['navigation']>();
    const dictionaryStore = useDictionaryStore();
    const {
        user,
        patchUserProfile,
        userUpdated,
        setUserWasUpdated,
        error,
        setUserProfileError,
        registrationAddressError,
        residentialAddressError,
        clearAddressErrors,
        setUser
    } = useUserStore();
    const { setModal, setLoading } = useUIStore();

    useEffect(() => {
        (async () => {
            if (!user || !user.registrationAddress.cityKladrId) {
                setLoading(true);

                const { data: userResponse } = await getUserProfile();

                userResponse && setUser(userResponse);
                setLoading(false);
            }
        })();
    }, []);

    /**
     *  После обновления
     */
    useEffect(() => {
        if (userUpdated) {
            setModal({
                title: locale.successModal.title,
                buttons: [
                    {
                        label: locale.successModal.button,
                        onPress: () => {
                            setUserWasUpdated(false);
                            fetchDictionary();
                            setModal(null);
                            navigation.replace(ROUTES.PROFILE_LIST);
                        }
                    }
                ]
            });
        }
    }, [userUpdated]);

    /**
     *  Загрузка словарей для selectbox
     *  (Доход, семейное положение и т.п.)
     */
    useEffect(() => {
        if ((!dictionaryStore.dictionary || !dictionaryStore.addresses.registration) && user) {
            fetchDictionary();
        }
    }, [user]);

    const fetchDictionary = async () => {
        setLoading(true);

        if (error) {
            setUserProfileError('');
        }

        clearAddressErrors();

        try {
            await dictionaryStore.fetchDictionary();
        } finally {
            setLoading(false);
        }
    };

    const onPhonePress = () => {
        setModal({
            title: locale.infoModal.title,
            buttons: [
                {
                    label: locale.infoModal.call,
                    onPress: () => Linking.openURL(`tel:${clearPhoneMask(Config.PHONE)}`)
                },
                {
                    label: locale.infoModal.cancel,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => setModal(null)
                }
            ]
        });
    };

    const onSubmit = async (data: Partial<IUserProfile>) => {
        setLoading(true);
        clearAddressErrors();

        try {
            await patchUserProfile(data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout
            theme="gray"
            loading={dictionaryStore.loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar disableHorizontalIndent>
                <View style={[styles.container, styles.mb20]}>
                    <InfoText apperiance="info">
                        <Text style={styles.helpText}>
                            {`${locale.hint} `}
                            <Text onPress={onPhonePress} style={styles.helpTextPhone}>
                                {Config.PHONE}
                            </Text>
                        </Text>
                    </InfoText>
                    {error.length > 0 && (
                        <View style={styles.mt20}>
                            <ErrorMessage message={error} />
                        </View>
                    )}
                </View>
                {!dictionaryStore.loading && user && (
                    <UserProfileForm
                        user={user}
                        regAddressError={registrationAddressError}
                        resAddressError={residentialAddressError}
                        onSubmit={onSubmit}
                    />
                )}
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(UserProfileScreen);
