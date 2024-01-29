import { StyleSheet } from 'react-native';
import { shadow, common } from '../../../styles/common';

export default StyleSheet.create({
    documentsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow('#B1B1B1', 0, 4, 0.25, 8)
    },
    controlContainer: {
        marginTop: 20,
        paddingHorizontal: 16
    },
    document: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    documentIcon: {
        marginRight: 14
    },
    documentName: {
        ...common.text,
        color: '#172A56',
        flex: 1
    }
});
