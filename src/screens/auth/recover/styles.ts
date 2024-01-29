import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F6FA',
        paddingBottom: 28,
        paddingHorizontal: 16
    },
    logo: {
        alignItems: 'center',
        paddingVertical: 32
    },
    linkContainer: {
        paddingVertical: 32
    },
    link: common.link,
    topIndent: {
        marginTop: 16
    },
    diabledInput: {
        color: '#172A56'
    }
});
