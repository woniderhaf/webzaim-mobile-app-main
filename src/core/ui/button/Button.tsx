import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { ButtonApperiance } from '../../enums';
import styles from './styles';

export type ButtonProps = {
    value: string;
    onClick: () => void;
    secondary?: boolean;
    info?: boolean;
    transparent?: boolean;
    style?: ViewStyle | Array<ViewStyle>;
    disabled?: boolean;
    apperience?: ButtonApperiance;
    isLoading?: boolean;
};

const Button = ({
    value,
    onClick,
    secondary,
    style,
    transparent,
    info,
    disabled,
    apperience,
    isLoading
}: ButtonProps) => {
    return (
        <TouchableOpacity
            disabled={disabled || isLoading}
            style={[
                styles.button,
                secondary && styles.secondary,
                transparent && styles.transparent,
                info && styles.info,
                apperience && styles[apperience],
                style ?? {},
                disabled && styles.disabled
            ]}
            onPress={onClick}
        >
            {isLoading ? (
                <ActivityIndicator size={'small'} />
            ) : (
                <Text
                    style={StyleSheet.flatten([
                        styles.buttonText,
                        secondary && styles.secondaryText,
                        transparent && styles.transparentText,
                        info && styles.infoText,
                        apperience && styles[`${apperience}Text`],
                        disabled && styles.disabledText
                    ])}
                >
                    {value}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
