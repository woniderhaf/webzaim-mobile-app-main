import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#878A9C'
    },
    buttonText: {
        flex: 1
    },
    icon: {
        marginRight: 10
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#eaebf2',
        left: 16,
        right: 16,
        ...shadow('#B1B1B1', 0, 4, 0.5, 8)
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.15)'
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    itemSelected: {
        backgroundColor: '#D7DEE9'
    },
    label: common.regularText,
    active: {
        color: '#172A56'
    },
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
    }
});
