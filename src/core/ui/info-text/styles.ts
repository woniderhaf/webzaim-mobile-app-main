import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 18,
        backgroundColor: '#a7a7a71a',
        borderRadius: 14,
        alignItems: 'center'
    },
    text: {
        flex: 1,
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    info: {
        backgroundColor: '#E5F0FF'
    },
    infoText: {
        color: '#172A56'
    },
    warning: {
        backgroundColor: '#FFECCE'
    },
    warningText: {
        color: '#676977'
    },
    marginLeft: {
        marginLeft: 10
    }
});
