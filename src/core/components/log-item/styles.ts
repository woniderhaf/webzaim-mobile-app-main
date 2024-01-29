import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    dateFont: { color: '#676977' },
    pathRequestFont: { ...common.regularText },
    success: {
        color: 'green'
    },
    warning: {
        color: 'orange'
    },
    error: {
        color: 'red'
    }
});
