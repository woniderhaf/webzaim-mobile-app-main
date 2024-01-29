import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    registrationHeaderContainerw: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registrationHeaderContainer: {
        paddingHorizontal: 56,
        paddingVertical: 16,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        backgroundColor: '#276DCC'
    },
    registrationHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleContainer: {
        paddingHorizontal: 16
    },
    progress: {
        ...common.regularText
    },
    title: {
        ...common.mediumText,
        color: '#fff'
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    dotContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 14,
        height: 14
    },
    dotContainerActive: {
        shadowColor: '#00E5B9',
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#fff',
        opacity: 0.2,
        borderRadius: 4
    },
    dotActive: {
        backgroundColor: '#00E5B9',
        opacity: 1
    }
});
