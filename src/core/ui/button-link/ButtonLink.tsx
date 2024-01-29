import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

type ButtonIconProps = {
    text: string,
    onPress: () => any,
    style?: ViewStyle,
    textStyle?: TextStyle,
    disabled?: boolean
};

const ButtonLink = ({ text, onPress, style, textStyle, disabled }: ButtonIconProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={style || {}}
            hitSlop={{ top: 6, left: 8, right: 8, bottom: 6 }}
        >
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ButtonLink;
