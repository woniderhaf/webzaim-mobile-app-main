import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainLayout: {
        width: '100%',
        height: 200,
        backgroundColor: 'red'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabLabel: {
        fontFamily: 'Lato-Regular',
        color: '#878A9C',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
        flex: 1
    },
    tabLabelActive: {
        color: '#2B56B9'
    }
});
