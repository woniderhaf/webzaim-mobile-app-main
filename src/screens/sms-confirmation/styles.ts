import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonIcon: {
        marginRight: 12
    },
    buttonTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 22
    },
    buttonSubtitle: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    form: {
        paddingBottom: 32
    },
    formTitle: {
        color: '#23282E',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 14
    },
    formText: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    formHint: {
        color: '#A7A7A7',
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        lineHeight: 16,
        marginTop: 8,
        marginBottom: 24
    },
    formControl: {
        paddingTop: 32
    },
    shortcutContainer: {
        marginTop: 20,
        alignItems: 'center',
        alignContent: 'center'
    }
});
