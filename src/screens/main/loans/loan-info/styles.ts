import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../../styles/common';

export default StyleSheet.create({
    screen: common.screen,
    preview: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8),
        paddingHorizontal: 12,
        paddingTop: 18,
        paddingBottom: 10
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    previewLabelContainer: {
        flex: 1
    },
    previewLabel: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    previewLabelOutline: {
        color: '#172A56'
    },
    previewTitleContainer: {
        flex: 1,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    previewTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 26
    },
    previewValue: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        lineHeight: 20
    },
    previewValueOutline: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    previewFooter: {
        borderTopWidth: 1,
        borderTopColor: '#D7DEE9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingBottom: 4,
        marginTop: 4
    },
    previewFooterWithAddons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 26
    }
});
