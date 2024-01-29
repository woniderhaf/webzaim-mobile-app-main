import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F6FA',
        paddingBottom: 16,
        paddingHorizontal: 16
    },
    logo: {
        alignItems: 'center',
        paddingVertical: 32
    },
    linkContainer: {
        paddingVertical: 32
    },
    link: common.link,
    pinCodeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pinCode: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 14
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: '#D7DEE9'
    },
    dotActive: {
        backgroundColor: '#276DCC'
    },
    pinCodeError: {
        height: 17,
        marginBottom: 30
    },
    pinCodeErrorText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: '#E13A3A'
    },
    pinCodeLabel: {
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 26,
        color: '#172A56',
        marginBottom: 18
    },
    subActions: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
