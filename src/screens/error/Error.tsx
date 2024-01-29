import React, { useCallback } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Config from 'react-native-config';
import MainLayout from '../../core/layouts/main-layout';
import { clearPhoneMask } from '../../core/utils';
import styles from './styles';

const error_img = require('./images/error.png');

const ErrorScreen = () => {
    const onPhoneHandler = useCallback(() => {
        Linking.openURL(`tel:${clearPhoneMask(Config.PHONE)}`);
    }, []);

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={error_img} style={styles.image} />
                </View>
                <View style={styles.error}>
                    <Text style={styles.title}>Отсутствует интернет-соединение</Text>
                    <Text style={styles.subtitle}>Проверьте подключение к Wi-Fi, сотовой сети или позвоните по номеру</Text>
                    <Text style={styles.tel} onPress={onPhoneHandler}>{Config.PHONE}</Text>
                </View>
            </View>
        </MainLayout>
    );
};

export default ErrorScreen;
