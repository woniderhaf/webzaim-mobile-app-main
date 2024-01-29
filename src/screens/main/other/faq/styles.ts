import { StyleSheet } from 'react-native';
import { common, shadow } from '../../../../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    flatListContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16
    },
    sliderContainerStyles: {
        borderTopWidth: 0,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    },
    sliderBodyStyles: {
        paddingHorizontal: 16
    },
    sliderButtonContainer: {
        paddingVertical: 0
    },
    sliderButton: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 44
    },
    labelContainer: {
        flex: 1
    },
    label: {
        ...common.regularText
    },
    labelOpened: {
        fontFamily: 'Lato-Bold'
    },
    questionsContainerStyles: {
        paddingBottom: 10
    },
    questionLinkContainer: {
        paddingVertical: 10
    },
    questionLink: {
        ...common.text,
        color: '#172A56'
    }
});
