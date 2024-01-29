import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    status: {
        ...common.text
    },
    document: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 22,
        marginTop: 8
    },
    download: {
        ...common.text,
        color: '#2B56B9',
        marginTop: 15
    }
});
