import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        ...common.largeText,
        marginBottom: 16
    },
    text: {
        ...common.regularText,
        color: '#676977',
        marginBottom: 16
    },
    referralContainer: {
        marginVertical: 16
    }
});
