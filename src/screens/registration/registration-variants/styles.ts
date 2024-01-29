import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        padding: 16
    },
    buttonContainer: {
        marginBottom: 16
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonIcon: {
        marginRight: 12
    },
    buttonTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        lineHeight: 22
    },
    buttonSubtitleContainer: {
        paddingRight: 35,
        flex: 1
    },
    buttonSubtitle: {
        ...common.regularText
    },
    buttonHintContainer: {
        marginTop: 8
    },
    buttonHint: {
        ...common.text
    },
    listTitleContainer: {
        paddingVertical: 16
    },
    listTitle: {
        ...common.mediumText
    }
});
