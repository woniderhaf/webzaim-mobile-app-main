import React, { useCallback } from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import Config from 'react-native-config';
import useLog from '../../core/hooks/useLog';
import MainLayout from '../../core/layouts/main-layout';
import { clearPhoneMask } from '../../core/utils';
import styles from './styles';

const error_img = require('./images/error_500.png');

const locale = {
    title: 'Приносим свои извинения, сервер временно недоступен',
    subtitle: 'Если вам срочно нужна помощь, вы можете связаться с нами по номеру'
};

const Error500Screen = () => {
    const [onPressLog, onLongPressLog] = useLog();

    const onPhoneHandler = useCallback(() => {
        Linking.openURL(`tel:${clearPhoneMask(Config.PHONE)}`);
    }, []);

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback onPress={onPressLog} onLongPress={onLongPressLog}>
                        <Image source={error_img} style={styles.image} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.error}>
                    <Text style={styles.title}>{locale.title}</Text>
                    <Text style={styles.subtitle}>{locale.subtitle}</Text>
                    <Text style={styles.tel} onPress={onPhoneHandler}>{Config.PHONE}</Text>
                </View>
            </View>
        </MainLayout>
    );
};

export default Error500Screen;
