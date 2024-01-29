import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../ui';
import styles from './styles';

type CustomKeyboardButton = {
    onPress: () => any;
    text?: string,
    icon?: string
};

type PincodeKeyboardProps = {
    onPressBtn: (value: number) => void;
    leftButton?: CustomKeyboardButton;
    rightButton?: CustomKeyboardButton;
};

const PincodeKeyboard = ({ onPressBtn, leftButton, rightButton }: PincodeKeyboardProps) => {
    const renderCustomButton = (index: number) => {
        const btn = index === 9 ? leftButton : rightButton;

        if (btn) {
            return (
                <TouchableOpacity
                    key={String(index)}
                    onPress={btn.onPress}
                    style={styles.keyboardButton}
                >
                    {btn.text && (<Text style={styles.link}>{'Выйти'}</Text>)}
                    {btn.icon && (<Icon name={btn.icon} size={30} />)}
                </TouchableOpacity>
            );
        }

        return <View key={String(index)} style={styles.keyboardButton} />;
    };

    const renderKeyboardBtn = (index: number) => {
        switch (index) {
        case 9:
        case 11:
            return renderCustomButton(index);
        default:
            const label = index  === 10 ? 0 : index + 1;

            return (
                <TouchableOpacity
                    key={String(index)}
                    onPress={() => onPressBtn(label)}
                    style={styles.keyboardButton}
                >
                    <Text style={styles.keyboardButtonLabel}>
                        {label}
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.keyboard}>
            {new Array(12).fill(1).map((_, index) => renderKeyboardBtn(index))}
        </View>
    );
};

export default PincodeKeyboard;
