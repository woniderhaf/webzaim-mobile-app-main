import { StyleSheet } from 'react-native';
import { shadow } from '../../styles/common';

export default StyleSheet.create({
    slider: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    animateView: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    sliderImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    sliderImageImg: {
        width: '100%',
        height: '100%'
    },
    sliderContent: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        alignContent: 'stretch'
    },
    sliderBody: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sliderTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        marginTop: 24
    },
    sliderSubitle: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 16,
        color: '#172A56',
        textAlign: 'center',
        marginTop: 12,
        paddingHorizontal: 48
    },
    dots: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 3
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E9E9E9',
        marginHorizontal: 5
    },
    active: {
        backgroundColor: '#44E8BB',
        ...shadow('#44E8BB', 0, 0, 1, 5)
    },
    actions: {
        width: '100%',
        paddingTop: 24,
        paddingBottom: 12,
        paddingHorizontal: 16
    },

    ['step_1']: {
        width: '90%',
        marginRight: -30,
        marginBottom: -30
    },
    ['step_3']: {
        alignSelf: 'flex-end',
        height: '120%',
        marginRight: -30,
        marginBottom: '-30%',
        resizeMode: 'contain'
    },
    btn: {
        backgroundColor: '#fff'
    },
    privacyPoliceDescription: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        lineHeight: 14,
        color: '#A7A7A7',
        textAlign: 'center',
        marginBottom: 12
    },
    privacyPolice: { textDecorationLine: 'underline' }
});
