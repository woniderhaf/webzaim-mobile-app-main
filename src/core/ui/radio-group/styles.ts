import { StyleSheet } from 'react-native';
import { common } from '../../../styles/common';

export default StyleSheet.create({
    radioInput: {
        marginTop: 16
    },
    radioInputFirst: {
        marginTop: 0
    },
    radioInputContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start'
    },
    radioInputIcon: {
        marginTop: 0
    },
    radioInputLabel: {
        ...common.regularText,
        marginLeft: 10
    },
    radioInputLabelContainer: {

    }
});
