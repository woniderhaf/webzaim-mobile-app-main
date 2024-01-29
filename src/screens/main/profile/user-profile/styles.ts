import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    mt20: {
        marginTop: 20
    },
    mb20: {
        marginBottom: 20
    },
    groupHead: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#eaebf2'
    },
    groupTitle: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize:18,
        lineHeight: 26
    },
    groupBody: {
        paddingHorizontal: 16,
        paddingTop: 16
    },
    helpText: {
        ...common.regularText,
        color: '#676977'
    },
    helpTextPhone: {
        ...common.regularText,
        color: '#276DCC'
    }
});
