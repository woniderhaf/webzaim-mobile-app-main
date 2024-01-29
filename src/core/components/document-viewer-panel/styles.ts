import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    errorMessageContainer: {
        padding: 16
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
    },
    pdf: {
        flex: 1,
        backgroundColor: '#F5F6FA'
    }
});
