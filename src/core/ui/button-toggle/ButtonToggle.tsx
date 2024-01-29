import React, { ReactEventHandler } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { ButtonApperiance } from '../../enums';
import styles from './styles';

type ButtonProps = {
    label: string;
    onPress: () => any;
    selected: boolean;
    disabled?: boolean;
};

const ButtonToggle = ({ label, selected, disabled, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.button,
                disabled && styles.disabled,
                selected && styles.selected
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.buttonText,
                disabled && styles.buttonTextDisabled,
                selected && styles.buttonTextSelected
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonToggle;
