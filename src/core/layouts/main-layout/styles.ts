import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#fff',
        minHeight: '100%'
    },
    white: {
        backgroundColor: '#fff'
    },
    blue: {
        backgroundColor: '#276DCC'
    },
    gray: {
        backgroundColor: '#F5F6FA'
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255, 0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderContainer: {
        flex: 1,
        position: 'relative'
    }
});
