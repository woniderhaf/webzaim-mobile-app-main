import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

type ErrorMessageProps = {
    message: string
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <View style={styles.container}>
            {message?.length > 0 && <Text style={styles.text} selectable>{message}</Text>}
        </View>
    );
};

export default ErrorMessage;
