import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    postTitle: {
        ...common.largeText,
        marginBottom: 16
    }
});
