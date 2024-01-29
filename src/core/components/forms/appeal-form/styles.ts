import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    formTitle: common.title,
    formDescription: {
        ...common.text,
        marginTop: 16
    },
    formBody: {
        marginTop: 24
    },
    formGroupTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 24
    }
});
