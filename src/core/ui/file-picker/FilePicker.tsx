import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export type FilePickerProps = {
    label: string;
    onPress: () => void;
};

const FilePicker = ({ label = 'Добавить', onPress }: FilePickerProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.circle}><Text style={styles.plus}>+</Text></View>
                {Boolean(label) && (
                    <Text style={styles.text} selectable>{label}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default FilePicker;
