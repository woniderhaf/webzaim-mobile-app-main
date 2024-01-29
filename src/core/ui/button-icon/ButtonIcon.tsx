import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from '../icons';
import styles from './styles';

type ButtonIconProps = {
    name: string,
    onPress: () => any,
    size?: number,
    style?: ViewStyle,
    disabled?: boolean
};

const ButtonIcon = ({ name, size, onPress, style, disabled }: ButtonIconProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={style || {}}
            hitSlop={{ top: 6, left: 8, right: 8, bottom: 6 }}
        >
            <Icon name={name} size={size || 24} />
        </TouchableOpacity>
    );
};

export default ButtonIcon;
