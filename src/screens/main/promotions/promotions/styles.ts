import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        padding: 16
    },
    image: {
        height: 156,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    previewContainer: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    previewTitleContainer: {
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    title: {
        ...common.mediumText,
        marginBottom: 4
    }
});
