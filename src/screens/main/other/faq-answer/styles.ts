import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    question: {
        ...common.largeText,
        marginBottom: 16
    }
});
