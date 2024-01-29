import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        marginTop: 16
    },
    buttonContainer: {
        marginBottom: 16
    },
    buttonBodyContainer: {
        flexDirection: 'row'
    },
    buttonTitle: {
        ...common.regularText
    },
    buttonIconContainer: {
        marginRight: 5
    },
    opacity: {
        opacity: 0.5
    }
});
