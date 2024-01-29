import { Platform, StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

const INPUT_HEIGHT = 48;

const INPUT_PADDING = Platform.select({ ios: 6, android: 4 });

export default StyleSheet.create({
    errorContainer: {
        height: 14,
        lineHeight: 14,
        marginTop: 4
    },
    error: {
        color: '#E13A3A',
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        lineHeight: 14

    },
    hintContainer: {
        marginTop: 4
    },
    hint: {
        color: '#A7A7A7',
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        lineHeight: 16
    },
    inputWrapper: {
        position: 'relative'
    },
    inputContainer: {
        position: 'relative',
        height: INPUT_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: '#878A9C'
    },
    inputContainerFocused: {
        borderBottomColor: '#276DCC'
    },
    inputContainerFilled: {
        borderBottomColor: '#276DCC'
    },
    input: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1,
        flex: 1,
        width: '100%',
        height: 30,
        lineHeight: 16,
        textAlign: 'left',
        color: '#172A56',
        fontFamily: 'Lato-Regular',

        fontSize: 16,
        // lineHeight: 30,
        paddingLeft: 0,
        paddingVertical: Platform.select({ ios: 6, android: 2 }),
        textAlignVertical: 'center',
        margin: 0
        // padding: 0,
        // backgroundColor: 'green'
    },
    inputFilled: {

    },
    inputFocused: {

    },
    inputDisabled: {
        color: '#6A6A6A'
    },
    labelContainer: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%'
        // backgroundColor: 'red'
    },
    label: {
        height: INPUT_HEIGHT,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        textAlignVertical: 'center'
    },
    labelFilled: {
        height: 16
    },
    labelFocused: {
        height: 16
    },
    labelText: {
        fontFamily: 'Lato-Regular',
        color: '#878A9C',
        fontSize: 16,
        lineHeight: 24
    },
    labelTextFilled: {
        fontFamily: 'Lato-Regular',
        color: '#2B56B9',
        fontSize: 12,
        lineHeight: 14
    },
    labelTextFocused: {
        fontFamily: 'Lato-Regular',
        color: '#2B56B9',
        fontSize: 12,
        lineHeight: 14
    },
    postfix: {
        position: 'absolute',
        zIndex: 3,
        width: 24,
        height: 24,
        right: 0,
        bottom: 8
    }
});
