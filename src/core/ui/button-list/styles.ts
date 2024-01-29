import { StyleSheet } from 'react-native';
import { shadow } from '../../../styles/common';

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    centered: {
        alignItems: 'center'
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 22
    }
});
