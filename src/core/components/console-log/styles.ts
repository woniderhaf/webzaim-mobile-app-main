import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    labelContainer: {
        // flex: 1,
        // width: '25%'
        // maxWidth: '25%'
        paddingRight: 8
    },
    label: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 16,
        color: '#333'
    },
    valueContainer: {
        flex: 1
    },
    value: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16
        // textAlign: 'right'
    }
});
