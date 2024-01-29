import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor:'#F5F6FA',
        minHeight: 56,
        paddingVertical: 18,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#D7DEE9'
    },
    headerContrast: {
        backgroundColor: '#276DCC',
        borderBottomColor: '#276DCC'
    },
    headerWhite: {
        backgroundColor: '#FFF',
        borderBottomColor: '#FFF'
    },
    titleContainer: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Lato-Medium',
        color: '#172A56',
        fontSize: 20,
        lineHeight: 28
    },
    titleContrast: {
        color: '#fff',
        overflow: 'hidden'
    },
    rightActions: {
        paddingLeft: 12,
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
});
