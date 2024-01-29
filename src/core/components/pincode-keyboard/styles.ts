import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    link: common.link,
    keyboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch'
    },

    keyboardButton: {
        width: '33%',
        height: 56,
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    keyboardButtonLabel: {
        // fontFamily: 'Lato-Regular',
        fontSize: 29,
        color: '#2B56B9'
    }
});
