import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        padding: 16
    },
    postPreviewContainer: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    postPreviewTitleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    title: {
        ...common.mediumText,
        marginBottom: 4
    }
});
