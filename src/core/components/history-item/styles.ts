import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../styles/common';
import { HIstoryItemStatusTypes } from '../../enums';

export default StyleSheet.create({
    logo: {
        width: 104,
        height: 33
    },
    body: {
        paddingTop: 12
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
    [HIstoryItemStatusTypes.APPROVED]: {
        color: '#00B894'
    },
    [HIstoryItemStatusTypes.PENDING_APPROVAL]: {
        color: '#FFA05B'
    },
    [HIstoryItemStatusTypes.WAITING_USER_CONFIRMATION]: {
        color: '#FFA05B'
    },
    [HIstoryItemStatusTypes.CANCELLED]: {
        color: '#E13A3A'
    },
    [HIstoryItemStatusTypes.REJECTED]: {
        color: '#E13A3A'
    },
    [HIstoryItemStatusTypes.REPAID]: {
        color: '#676977'
    }
});
