import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../icons';
import styles from './styles';

type InfoTextProps = {
    children?: React.ReactChild | React.ReactChildren | React.ReactNode;
    value?: string;
    apperiance?: 'info' | 'warning';
    iconName?: string;
};

const InfoText = ({ children, value, apperiance, iconName }: InfoTextProps) => {
    return (
        <View style={[styles.container, apperiance && styles[apperiance]]}>
            {iconName && <Icon name={iconName} size={24} />}
            {value && value.length > 0 && (
                <Text style={[styles.text, !!iconName && styles.marginLeft, apperiance && styles[`${apperiance}Text`]]}>
                    {value}
                </Text>
            )}
            {children ?? null}
        </View>
    );
};

export default InfoText;
