import { StyleSheet, Platform } from 'react-native';

const shadow = (color: string, xOffset: any, yOffset: any, opacity: any, blur: any) => {
    const styles = Platform.select({
        ios: {
            shadowColor: color,
            shadowOffset: {
                width: xOffset,
                height: yOffset
            },
            shadowOpacity: opacity,
            shadowRadius: blur
        },
        android: {
            elevation: blur,
            shadowColor: color
        }
    });

    return StyleSheet.create({ ...styles });
};

const common = StyleSheet.create({
    title: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        lineHeight: 24
    },
    smallText: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        lineHeight: 20
    },
    text: {
        color: '#676977',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    regularText: {
        color: '#172A56',
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    mediumText: {
        color: '#172A56',
        fontFamily: 'Lato-Medium',
        fontSize: 18,
        lineHeight: 24
    },
    largeText: {
        color: '#172A56',
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        lineHeight: 24
    },
    link: {
        color: '#2B56B9',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F6FA',
        paddingBottom: 28,
        paddingHorizontal: 16,
        position: 'relative'
    },
    globalError: {
        color: 'red',
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 10
    },
    clearMargin: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    }
});

export { shadow, common };
