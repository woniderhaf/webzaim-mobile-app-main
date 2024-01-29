import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D7DEE9',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginBottom: 20,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'

    },
    circle: {
        borderWidth: 1,
        borderRadius: 24,
        borderColor: '#D7DEE9',
        width: 48,
        height: 48,
        justifyContent: 'center'
    },
    plus: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize:16,
        lineHeight: 20,
        textAlign: 'center'
    },
    text: {
        ...common.regularText,
        marginTop: 10
    }
});
