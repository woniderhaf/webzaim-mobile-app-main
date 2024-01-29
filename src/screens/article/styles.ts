import { StyleSheet } from 'react-native';
import { common } from '../../styles/common';

export default StyleSheet.create({
    imageContainer: {
        height: 154,
        marginBottom: 24,
        borderRadius: 14,
        backgroundColor: '#C4C4C4'
    },
    body: {},
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 16
    },
    date: {
        ...common.text,
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginBottom: 20,
        backgroundColor: '#E1EAF7'
    },
    text: {
        ...common.regularText,
        color: '#676977',
        marginBottom: 22
    }
});
