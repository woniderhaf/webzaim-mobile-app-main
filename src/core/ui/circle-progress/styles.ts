import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {},
    outer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    half: {
        position: 'absolute',
        left: 0,
        top: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
});
