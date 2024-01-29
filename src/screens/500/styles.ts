import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    imageContainer: {
        flexBasis: '60%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingH: 20
    },
    image: {
        width: '65%',
        height: '75%',
        resizeMode: 'contain'
    },
    error: {
        alignItems: 'center'
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 24,
        marginTop: 34,
        paddingHorizontal: 16,
        textAlign: 'center'
    },
    subtitle: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        marginVertical: 8,
        paddingHorizontal: 16
    },
    tel: {
        color: '#2B56B9',
        fontFamily: 'Lato-Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24
    }
});
