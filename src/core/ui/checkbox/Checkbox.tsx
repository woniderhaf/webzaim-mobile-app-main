import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native';
import { Icon } from '../icons';
import styles from './styles';

type CheckboxProps = {
    value: boolean,
    label?: string,
    onChange?: (value: boolean) => void,
    style?: any,
    disabled?: boolean
};

const Checkbox = ({ value, label, style, onChange, disabled }: CheckboxProps) => {
    const [checked, setChecked] = useState(value);

    const onClick = () => {
        if (disabled) {
            return;
        }

        setChecked(!checked);

        if (onChange) {
            onChange(!checked);
        }
    };

    const renderIcon = useMemo(() => {
        let icon = 'checkbox';

        if (disabled) {
            icon = checked ? 'checkboxDisabledActive' : 'checkboxDisabled';
        } else if (checked) {
            icon = 'checkboxActive';
        }

        return <Icon name={icon} size={18} />;
    }, [disabled, checked]);

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxIcon}>
                    {renderIcon}
                </View>
                {label && (
                    <View style={styles.checkboxLabelContainer}>
                        <Text style={[
                            styles.checkboxLabel,
                            disabled && styles.checkboxLabelDisabled,
                            style || {}
                        ]}>
                            {label}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default Checkbox;
