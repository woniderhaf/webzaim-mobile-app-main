import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    preview: {
        ...shadow('#B1B1B1', 0, 4, 0.25, 8),
        borderRadius: 14,
        backgroundColor: '#fff'
    },
    imageContainer: {
        flex: 1,
        height: 156,
        backgroundColor: '#C4C4C4',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    image: {},
    body: {
        flex: 1,
        padding: 16
    },
    titleRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        marginBottom: 3
    },
    titleContainer: {
        flex: 1
    },
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 26
    },
    dateContainer: {
        marginLeft: 10
    },
    date: {
        color: '#959595',
        fontFamily: 'Lato-Regular',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 26
    },
    description: {
        ...common.text,
        marginBottom: 4
    }
});
