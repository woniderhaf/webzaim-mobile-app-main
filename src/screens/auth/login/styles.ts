import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    screen: common.screen,
    logo: {
        alignItems: 'center',
        paddingVertical: 32
    },
    linkContainer: {
        alignItems: 'flex-start',
        paddingVertical: 32
    },
    link: common.link,
    globalError: common.globalError,
    topIndent: {
        marginTop: 16
    }
});
