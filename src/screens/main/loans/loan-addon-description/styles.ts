import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'space-between',
        // backgroundColor: '#F5F6FA',
        padding: 16,
        paddingTop: 32
    },
    description: {
        ...common.mediumText,
        marginBottom: 20
    }
});
