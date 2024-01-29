import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    button: {
        height: 32,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6DEEA',
        backgroundColor: 'transparent',
        paddingHorizontal: 15
    },
    disabled: {},
    selected: {
        borderColor: '#BECAEC',
        backgroundColor: '#E5F0FF'
    },
    buttonText: {
        ...common.text
    },
    buttonTextDisabled: {
        ...common.text
    },
    buttonTextSelected: {
        ...common.text,
        color: '#2B56B9'
    }
});
