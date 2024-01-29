import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from '../icons';
import styles from './styles';

type SlideDownProps = {
    children: React.ReactChild | React.ReactChildren | React.ReactNode;
    label?: string;
    containerStyles?: StyleProp<ViewStyle>;
    bodyStyles?: StyleProp<ViewStyle>;
    buttonContainerStyles?: StyleProp<ViewStyle>;
    renderCustomButton?: (opened: boolean) => JSX.Element | null;
};

const SlideDown = ({ children, label, containerStyles, bodyStyles, buttonContainerStyles,  renderCustomButton }: SlideDownProps) => {
    const [open, setOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animation = useSharedValue(0);
    const animationStyles = useAnimatedStyle(() => ({
        height: animation.value
    }));

    const toggleHeight = () => {
        setOpen(!open);
    };

    useEffect(() => {
        animation.value = withTiming(contentHeight ?? 0, {
            duration: 250
        });
    }, [contentHeight]);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        setContentHeight(event.nativeEvent.layout.height);
    }, []);

    const renderButton = useMemo(() => {
        const button = renderCustomButton
            ? renderCustomButton(open)
            : (
                <>
                    <Text style={styles.label}>{label || ''}</Text>
                    <Icon name={open ? 'angleUp' : 'angleDown'} size={20} />
                </>
            );

        return (
            <TouchableOpacity onPress={toggleHeight} style={[styles.buttonContainer, buttonContainerStyles]}>
                {button}
            </TouchableOpacity>
        );
    }, [label, open, renderCustomButton]);

    return (
        <View style={[styles.container, containerStyles]}>
            {renderButton}
            <Animated.View style={[styles.body, animationStyles, bodyStyles]}>
                <Animated.View onLayout={onLayout}>
                    {open && (
                        <>
                            {children}
                        </>
                    )}
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default SlideDown;
