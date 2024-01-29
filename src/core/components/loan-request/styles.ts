import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../styles/common';

export default StyleSheet.create({
    loanRequest: {
        paddingBottom: 24
    },
    slider: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow('#B1B1B1', 0, 4, 0.25, 8)
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: '#00E5B9',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sliderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    value: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 26
    },
    totalValue: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 20
    },
    hint: {
        color: '#878A9C',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    total: {
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow('#B1B1B1', 0, 4, 0.25, 8)
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    noM: common.clearMargin,
    addons: {
        marginTop: 24,
        paddingTop: 18,
        paddingHorizontal: 12,
        marginBottom: 34,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow('#B1B1B1', 0, 4, 0.25, 8)
    },
    addonsTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 26
    },
    addon: {
        paddingVertical: 25,
        borderTopWidth: 1,
        borderTopColor: '#D7DEE9'
    },
    first: {
        borderTopWidth: 0
    },
    congratulationsBlock: {
        borderRadius: 14,
        backgroundColor: '#f1f2f7',
        marginBottom: 26
    },
    congratulationsBlockContent: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    congratulationsIcon: {
        paddingTop: 2,
        marginRight: 8
    },
    congratulationsTitle: {
        ...common.text,
        color: '#172A56',
        fontFamily: 'Lato-Bold'
    },
    congratulationsSubtitle: {
        ...common.smallText
    }
});
