import React, { ReactEventHandler } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import styles from './styles';

const BoxPreloader = () => {
    return (
        <View style={styles.box}>
            <ActivityIndicator size={'large'} color={styles.indicator.color} />
        </View>
    );
};

export default BoxPreloader;
