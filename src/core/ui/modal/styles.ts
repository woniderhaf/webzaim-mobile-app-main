import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.45)'
    },
    modal: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        ...shadow( '#B1B1B1', 0, 4, 0.5, 8)
    },

    modalTitle: {
        ...common.mediumText,
        textAlign: 'center'
    },
    modalDescription: {
        ...common.text,
        textAlign: 'center'
    },
    buttons: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    buttonsVertical: {
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    buttonContainer: {
        flex: 1,
        marginLeft: 6
    },
    buttonContainerVertical: {
        flex: 0,
        marginTop: 16,
        marginLeft: 0
    },
    buttonContainerFirst: {
        marginTop: 0,
        marginLeft: 0
    }
});
