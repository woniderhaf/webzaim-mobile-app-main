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
        width: '85%',
        height: '85%',
        resizeMode: 'contain',
        marginRight: -30
    },
    error: {
        alignItems: 'center'
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 24,
        marginTop: 34
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
