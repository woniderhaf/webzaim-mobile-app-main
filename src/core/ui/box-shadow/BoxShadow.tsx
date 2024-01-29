import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import styles from './styles';

type BoxShadowProps = {
    children: React.ReactChild | React.ReactChildren | React.ReactNode,
    padding?: number,
    paddingVertical?: number,
    paddingHorizontal?: number,
    background?: string
};

const BoxShadow = ({ children, background, padding, paddingHorizontal, paddingVertical }: BoxShadowProps) => {
    let customStyles: ViewStyle = {};

    if (background) {
        customStyles.backgroundColor = background;
    }

    if (typeof padding !== 'undefined') {
        customStyles.padding = padding;
    } else {
        if (typeof paddingHorizontal !== 'undefined') {
            customStyles.paddingHorizontal = paddingHorizontal;
        }

        if (typeof paddingVertical !== 'undefined') {
            customStyles.paddingVertical = paddingVertical;
        }
    }

    return (
        <View style={[
            styles.container,
            customStyles
        ]}>
            {children}
        </View>
    );
};

export default BoxShadow;
