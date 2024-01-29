import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from './styles';

export type ReadonlyFieldProps = {
    label: string;
    value: any;
    style?: TextStyle;
};

const ReadonlyField = ({ label, value, style }: ReadonlyFieldProps) => {
    return (
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>{label || ''}</Text>
            <Text style={[styles.fieldValue, style]}>{String(value)}</Text>
        </View>
    );
};

export default ReadonlyField;
