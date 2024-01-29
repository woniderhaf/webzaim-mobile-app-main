import React, { ReactEventHandler, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native';
import { Icon } from '../icons';
import styles from './styles';

type RadioGroupItem = {
    id: string;
    title: string;
};

type RadioGroupProps = {
    items: Array<RadioGroupItem>;
    value?: RadioGroupItem;
    onChange?: (value: RadioGroupItem) => void;
    style?: any;
    disabled?: boolean;
};

const RadioGroup = ({ items, value, style, onChange, disabled }: RadioGroupProps) => {
    const [selected, setSelected] = useState<RadioGroupItem | undefined>(value);

    const onClick = (item: RadioGroupItem) => {
        if (disabled) {
            return;
        }

        setSelected(item);

        if (onChange) {
            onChange(item);
        }
    };

    const renderItem = (item: RadioGroupItem, index: number) => {
        return (
            <View key={item.id} style={[styles.radioInput, index === 0 && styles.radioInputFirst]}>
                <TouchableOpacity onPress={() => onClick(item)} >
                    <View style={styles.radioInputContainer}>
                        <View style={styles.radioInputIcon}>
                            <Icon name={item.id === selected?.id ? 'radioInputActive' : 'radioInput'} size={24} />
                        </View>
                        {item.title && (
                            <View style={styles.radioInputLabelContainer}>
                                <Text style={[styles.radioInputLabel, style || {}]}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (<>{items.map(renderItem)}</>);
};

export default RadioGroup;
