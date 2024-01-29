import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        position: 'relative',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    content: {
        paddingTop: 110,
        alignItems: 'center'
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 30
    },
    preloader: {
        position: 'relative',
        paddingVertical: 30
    },
    image: {
        alignItems: 'center',
        transform: [{
            translateY: 30
        }]
    }
});
