import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    infoTitle: {
        ...common.mediumText,
        marginBottom: 16
    },
    text: {
        ...common.text,
        marginBottom: 6
    },
    btn: {
        marginTop: 10
    },
    btnWhite: {
        backgroundColor: '#fff'
    },
    scanBtn: { marginTop: 24 }
});
