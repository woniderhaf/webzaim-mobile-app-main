import React from 'react';
import { FlexAlignType, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from '../icons';
import styles from './styles';

type ButtonIconProps = {
    title?: string;
    onPress: () => any;
    size?: number;
    style?: ViewStyle;
    disabled?: boolean;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: FlexAlignType;
};

const ButtonList = ({ children, title, onPress, style, disabled, icon, iconPosition }: ButtonIconProps) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} disabled={disabled} style={[styles.button, style]}>
            <View style={{ flex: 1 }}>
                {title && <Text style={styles.title}>{title}</Text>}
                {children ?? null}
            </View>
            <View style={{ alignSelf: iconPosition ?? 'flex-start' }}>
                {icon ?? <Icon name="angleRight" size={24} />}
            </View>
        </TouchableOpacity>
    );
};

export default ButtonList;
