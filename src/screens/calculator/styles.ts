import { StyleSheet } from 'react-native';

import { shadow } from '../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F6FA'
    },
    actions: {
        paddingHorizontal: 16
    },
    button: {
        marginTop: 16,
        backgroundColor: '#F5F6FA'
    },
    zaim: {
        marginVertical: 16,
        marginHorizontal: 20,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        marginBottom: 8
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    label: {
        fontFamily: 'Lato-Regular',
        color: '#172A56',
        fontSize: 14,
        lineHeight: 20
    },
    value: {
        fontFamily: 'Lato-Bold',
        color: '#172A56',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'right'
    },
    rightNow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 11,
        marginTop: 6,
        borderTopColor: '#D7DEE9',
        borderTopWidth: 1
    },
    rightNowText: {
        fontFamily: 'Lato-Regular',
        color: '#172A56',
        fontSize: 14,
        lineHeight: 20,
        marginLeft: 5
    },
    sumSlider: {
        position: 'relative',
        marginHorizontal: 20,
        marginBottom: 28,
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.3, 6)
    },
    sumSliderBody: {
        paddingTop: 18,
        paddingBottom: 33,
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#fff',
        borderRadius: 14,
        alignItems: 'stretch'

    },
    sumSliderTitle: {
        paddingBottom: 14
    },
    sumSliderLabel: {
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        color: '#172A56',
        fontSize: 14,
        lineHeight: 20
    },
    sumSliderAmount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 12
    },
    amount: {
        fontFamily: 'Lato-Regular',
        color: '#A7A7A7',
        fontSize: 14,
        lineHeight: 20
    },
    currentSum: {
        fontFamily: 'Lato-Medium',
        color: '#172A56',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28
    },
    pseudoHead: {
        width: '100%',
        backgroundColor: '#276DCC',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        height: 72,
        marginBottom: -54
    },
    sliderThumb: {
        width: 40,
        height: 40,
        backgroundColor: '#00E5B9',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sumSliderContainer: {
        position: 'absolute',
        bottom: -22,
        left: 10,
        right: 10
    },

    sumSliderShadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 14,
        bottom: -4,
        zIndex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    sumSliderShadowLeft: {
        height: '100%',
        width: 50,
        backgroundColor: '#00E5B9',
        borderBottomLeftRadius: 14
    },
    sumSliderShadowRight: {
        height: '100%',
        flex: 1,
        backgroundColor: '#D7DEE9',
        borderBottomRightRadius: 14
    }
});
