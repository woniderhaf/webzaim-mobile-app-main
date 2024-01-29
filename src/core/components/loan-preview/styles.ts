import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../styles/common';

export default StyleSheet.create({
    preview: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    previewHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 20
    },
    loanInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: { width: 104, height: 33 },
    loanStatusContainer: {
        borderRadius: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        marginLeft: 18,
        backgroundColor: '#FFF6E9'
    },
    loanStatus: {
        color: '#FFA05B'
    },
    approved: {
        color: '#2B56B9',
        backgroundColor: '#E5F0FF'
    },
    rejected: {
        color: '#E13A3A',
        backgroundColor: '#FFF5F4'
    },
    previewBody: {
        paddingVertical: 12,
        marginHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D7DEE9'
    },
    previewBodyWithoutFooter: {
        paddingBottom: 20,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    subtitle: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4
    },
    subtitleError: {
        color: '#E13A3A'
    },
    subtitleWarning: {
        color: '#676977'
    },
    previewFooter: {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        overflow: 'hidden'
    },
    previewFooterContainer: {
        paddingVertical: 14
    },
    previewFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    previewFooterRowN: {
        marginTop: 4
    },
    previewFooterBtn: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    previewFooterBtnError: {
        backgroundColor: '#E13A3A',
        borderColor: '#E13A3A'
    }
});
