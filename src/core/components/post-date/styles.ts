import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    dateContainer: {
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginBottom: 16,
        backgroundColor: '#E1EAF7',
        borderRadius: 4
    },
    date: {
        ...common.text,
        lineHeight: 16
    }
});
