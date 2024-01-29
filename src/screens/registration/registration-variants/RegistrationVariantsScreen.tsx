import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import { RootStackScreenProps, ROUTES } from '../../../navigation';
import { useRegistrationStore, useUIStore } from '../../../store';
import { RegistrationOption } from '../../../core';
import { RegistrationType } from '../../../core/enums';
import { ButtonList, Icon } from '../../../core/ui';
import locale from './locale';
import styles from './styles';

const RegistrationVariantsScreen = () => {
    const { config, registrationOptions, fetchRegistrationConfig } = useRegistrationStore();
    const { loading } = useUIStore();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.REGISTRATION_VARIANTS>['navigation']>();

    const optionsIcons = {
        [RegistrationType.MANUAL]: 'circlePencil',
        [RegistrationType.PASSPORT_SCAN]: 'circleDocScan',
        [RegistrationType.ESIA]: 'circleEsia',
        [RegistrationType.TINKOFF]: 'circleTinkoff'
    };

    const registrationList = useMemo(
        () => registrationOptions.filter(item => item.type !== RegistrationType.TINKOFF),
        [registrationOptions]
    );

    useEffect(() => {
        (async () => {
            if (!config) {
                await fetchRegistrationConfig();
            }
        })();
    }, []);

    const onPressOption = useCallback((option: RegistrationOption) => {
        switch (option.type) {
            case RegistrationType.TINKOFF:
            case RegistrationType.ESIA:
                navigation.navigate(ROUTES.REGISTRATION_EXTERNAL, { endpoint: option.endpoint || '' });
                break;
            case RegistrationType.MANUAL:
            default:
                navigation.navigate(ROUTES.REGISTRATION);
                break;
        }
    }, []);

    const renderOption = useCallback(({ item }: { item: RegistrationOption }) => {
        const locales = locale.options[item.type] as { title: string; hint?: string };
        const icon = optionsIcons[item.type];

        return (
            <View style={styles.buttonContainer}>
                <ButtonList onPress={() => onPressOption(item)} iconPosition={'center'}>
                    <View style={styles.button}>
                        <View style={styles.buttonIcon}>
                            <Icon name={icon} size={46} />
                        </View>
                        <View style={styles.buttonSubtitleContainer}>
                            <Text style={styles.buttonSubtitle}>{locales.title}</Text>
                        </View>
                    </View>
                    {Boolean(locales?.hint) && (
                        <View style={styles.buttonHintContainer}>
                            <Text style={styles.buttonHint}>{locales?.hint}</Text>
                        </View>
                    )}
                </ButtonList>
            </View>
        );
    }, []);

    const renderListTitle = useMemo(
        () => (
            <View style={styles.listTitleContainer}>
                <Text style={styles.listTitle}>{locale.optionsListTitle}</Text>
            </View>
        ),
        []
    );

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <View style={styles.container}>
                <FlatList
                    data={registrationList}
                    renderItem={renderOption}
                    ItemSeparatorComponent={null}
                    initialNumToRender={4}
                    keyExtractor={i => JSON.stringify(i)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ListHeaderComponent={renderListTitle}
                />
            </View>
        </MainLayout>
    );
};

export default observer(RegistrationVariantsScreen);
