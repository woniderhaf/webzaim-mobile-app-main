import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        zIndex: 1
    },
    buttonText: {
        position: 'relative',
        zIndex: 999,
        flex: 1
    },
    icon: {
        marginRight: 10
    },
    dropdown: {
        maxHeight: 200
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    itemSelected: {
        backgroundColor: '#D7DEE9'
    },
    label: common.regularText
});
