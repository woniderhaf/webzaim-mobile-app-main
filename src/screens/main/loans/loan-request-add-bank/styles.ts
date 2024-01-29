import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../../styles/common';

export default StyleSheet.create({
    text: {
        ...common.text
    },
    controlContainer: {
        marginTop: 30
    },
    button: {
        // flexDirection: 'row'
    },
    buttonIcon: {
        marginRight: 12
    },
    buttonTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 22
    },
    buttonSubtitle: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4
    },
    paymentSum: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4
    },
    topIndent: {
        marginTop: 16
    }
});
