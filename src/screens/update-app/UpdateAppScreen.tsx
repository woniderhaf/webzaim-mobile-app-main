import React from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback, Platform } from 'react-native';
import Config from 'react-native-config';
import useLog from '../../core/hooks/useLog';
import MainLayout from '../../core/layouts/main-layout';
import { Button } from '../../core/ui';
import styles from './styles';

import UpdateAppImg from './images/update_app.png';

const locale = {
    title: 'Нужно обновить приложение',
    subtitle: 'Текущая версия устарела. Нажмите на кнопку ниже, чтобы обновить ее',
    button: 'Обновить'
};

const marketLink = Platform.OS === 'ios' ? Config.APPSTORE_URL : Config.GOOGLEPLAY_URL;

const UpdateAppScreen = () => {
    const [onPressLog, onLongPressLog] = useLog();

    const onUpdateApp = () => {
        marketLink && Linking.openURL(marketLink);
    };

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback onPress={onPressLog} onLongPress={onLongPressLog}>
                        <Image source={UpdateAppImg} style={styles.image} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.error}>
                    <Text style={styles.title}>{locale.title}</Text>
                    <Text style={styles.subtitle}>{locale.subtitle}</Text>
                    <Button value={locale.button} onClick={onUpdateApp} style={styles.button} />
                </View>
            </View>
        </MainLayout>
    );
};

export default UpdateAppScreen;
