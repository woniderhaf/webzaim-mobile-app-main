import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F6FA'
    },
    form: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 32
    },
    formTitle: {
        ...common.mediumText,
        marginBottom: 24
    }
});
