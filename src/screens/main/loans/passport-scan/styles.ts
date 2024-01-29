import { StyleSheet } from 'react-native';
import { common } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        justifyContent: 'space-between',
        flex: 1
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    image: {
        height: 68,
        width: 98,
        resizeMode: 'contain',
        borderRadius: 4
    },
    textItemExample: {
        ...common.regularText
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
        justifyContent: 'center'
    },
    buttonContainer: { marginTop: 24 },
    contentContainer: { marginHorizontal: 12, flex: 1 },
    fileLoadedText: {
        ...common.text,
        color: '#00B894',
        marginLeft: 4
    },
    textItem: {
        ...common.regularText,
        fontSize: 13,
        color: '#878A9C'
    },
    textDescription: {
        ...common.text,
        color: '#878A9C',
        marginBottom: 24
    },
    bottomContainer: { marginTop: 32 }
});
