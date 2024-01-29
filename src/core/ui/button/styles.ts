import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderColor: '#2B56B9',
        borderWidth: 1,
        height: 44,
        backgroundColor: '#2B56B9'
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Lato-Regular'
    },
    secondary: {
        backgroundColor: '#F5F6FA',
        borderColor: '#2B56B9',
        color: '#2B56B9'
    },
    transparent: {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    info: {
        backgroundColor: '#E5F0FF',
        borderColor: '#E5F0FF'
    },
    infoText: {
        color: '#172A56'
    },
    secondaryText: {
        color: '#2B56B9'
    },
    transparentText: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontWeight: '500',
        fontSize: 16
    },
    disabled: {
        backgroundColor: '#D7DEE9',
        borderColor: '#D7DEE9'
    },
    gray: {
        backgroundColor: '#D7DEE9',
        borderColor: '#D7DEE9'
    },
    grayText: {
        color: '#172A56'
    },
    white: {
        backgroundColor: '#FFF',
        borderColor: '#2B56B9'
    },
    whiteText: {
        color: '#2B56B9'
    },
    disabledText: {
        color: '#959595'
    }
});
