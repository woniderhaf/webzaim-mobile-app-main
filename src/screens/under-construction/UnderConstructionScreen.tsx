import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import useLog from '../../core/hooks/useLog';
import MainLayout from '../../core/layouts/main-layout';
import styles from './styles';

const under_construction_img = require('./images/under-construction.png');

const locale = {
    title: 'Данный раздел находится в разработке',
    subtitle: 'Совсем скоро он заработает, а пока можете воспользоваться нашими выгодными предложениями'
};

const UnderConstructionScreen = () => {
    const [onPressLog, onLongPressLog] = useLog();

    return (
        <MainLayout
            theme="white"
            header={{
                white: true,
                backButtonShow: true
            }}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableWithoutFeedback onPress={onPressLog} onLongPress={onLongPressLog}>
                        <Image source={under_construction_img} style={styles.image} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.error}>
                    <Text style={styles.title}>{locale.title}</Text>
                    <Text style={styles.subtitle}>{locale.subtitle}</Text>
                </View>
            </View>
        </MainLayout>
    );
};

export default UnderConstructionScreen;
