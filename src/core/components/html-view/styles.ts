import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    a: {
        color: '#172A56'
    },
    p: {
        ...common.regularText,
        color: '#676977',
        margin: 0,
        marginBottom: 24
    },
    h2: {
        ...common.largeText,
        margin: 0,
        marginBottom: 18
    },
    ol: {
        ...common.regularText,
        color: '#676977',
        margin: 0
    },
    ul: {
        ...common.regularText,
        color: '#676977',
        margin: 0
    },
    li: {
        margin: 0,
        marginBottom: 16,
        paddingLeft: 10
    }
});
