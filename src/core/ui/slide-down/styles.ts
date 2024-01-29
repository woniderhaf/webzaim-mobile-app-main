import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#D7DEE9'
    },
    body: {
        overflow: 'scroll'
    },
    buttonContainer: {
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonOpened: {
        paddingBottom: 0
    },
    label: {
        ...common.text
    }
});
