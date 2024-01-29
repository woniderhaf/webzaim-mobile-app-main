import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: '#276DCC'
        backgroundColor: '#F5F6FA'
    },
    form: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 32,
        backgroundColor: '#F5F6FA'
        // marginTop: -130,
    },
    formTitle: {
        ...common.mediumText,
        marginBottom: 24
    }
});
