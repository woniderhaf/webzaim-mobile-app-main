import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    addon: {},
    addonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    addonControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addonIcon: {
        marginRight: 12
    },
    addonTitleContainer: {
        flex: 1
    },
    addonTitle: common.regularText,
    selectbox: {
        fontSize: 16,
        lineHeight: 22
    },
    addonDescription: {
        marginVertical: 14,
        fontSize: 14,
        color: '#878A9C'
    },
    addonBtn: {
        width: 108,
        height: 30
    },
    addonBtnTransparent: {
        backgroundColor: 'transparent'
    },
    addonBtnTransparentActive: {
        borderWidth: 2,
        backgroundColor: 'transparent'
    }
});
