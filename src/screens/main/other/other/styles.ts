import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    socialLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32
    },
    link: {
        marginHorizontal: 16
    },
    appInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 24
    },
    appIcon: {
        marginBottom: 16
    },
    appVersion: common.regularText,
    buttonContainer: { marginBottom: 16 }
});
