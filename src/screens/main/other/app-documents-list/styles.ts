import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        padding: 16
    },
    documentContainer: {
        marginBottom: 16
    },
    button: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonIcon: {
        marginRight: 12
    },
    buttonTitle: {
        ...common.text,
        color: '#172A56'
    }
});
