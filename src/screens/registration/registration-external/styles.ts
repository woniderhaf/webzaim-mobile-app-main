import { StyleSheet } from 'react-native';

import { shadow } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    webviewNavigation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#D7DEE9'
    },
    webviewNavBtn: {
        width: 40,
        marginLeft: 15
    },
    disabled: {
        opacity: 0.3
    },
    errorContainer: {
        padding: 16
    }
});
