import React, { useEffect } from 'react';
import { View, Animated, Easing, Platform } from 'react-native';
import styles from './styles';

type CircleProgressProps = {
    activeColor: string;
    passiveColor: string;
    baseColor: string;
    radius: number;
    done: number;
    width: number;
    duration: number;
    children: React.ReactNode;
};

const CircleProgress = ({
    activeColor,
    passiveColor,
    baseColor,
    radius,
    done,
    width,
    duration,
    children
}: CircleProgressProps) => {
    const initialValueHalfCircle = done >= 50 ? 0 : 180;
    const initialValueInnerCircle = 0;
    const animatedValue1 = new Animated.Value(initialValueHalfCircle);
    const animatedValue2 = new Animated.Value(initialValueHalfCircle);
    const animatedValue3 = new Animated.Value(initialValueInnerCircle);
    const timePerDegree = duration / 360;
    const color1 = activeColor;
    const color2 = done >= 50 ? activeColor : passiveColor;

    const firstAnimation = () => {
        animatedValue1.setValue(initialValueHalfCircle);
        animatedValue2.setValue(initialValueHalfCircle);
        animatedValue3.setValue(initialValueInnerCircle);

        Animated.parallel([
            Animated.timing(animatedValue1, {
                toValue: 180,
                duration: 180 * timePerDegree,
                useNativeDriver: true,
                easing: Easing.linear
            }),
            Animated.timing(animatedValue2, {
                toValue: 180 + (done - 50) * 3.6,
                duration: (180 + (done - 50) * 3.6) * timePerDegree,
                useNativeDriver: true,
                easing: Easing.linear
            }),
            Animated.timing(animatedValue3, {
                toValue: (done - 50) * 3.6,
                delay: 180 * timePerDegree,
                duration: timePerDegree * ((done - 50) * 3.6),
                useNativeDriver: Platform.OS === 'android',
                easing: Easing.linear
            })
        ]).start();
    };

    const secondAnimation = () => {
        animatedValue1.setValue(initialValueHalfCircle);
        animatedValue2.setValue(initialValueHalfCircle);
        animatedValue3.setValue(initialValueInnerCircle);
        Animated.timing(animatedValue2, {
            toValue: 180 + done * 3.6,
            duration: done * 3.6 * timePerDegree,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    };

    useEffect(() => {
        if (done >= 50) {
            firstAnimation();
        } else {
            secondAnimation();
        }
    }, [done]);

    const renderHalf = (color: string, rotate: Animated.AnimatedInterpolation, otherStyles = {}) => (
        <Animated.View
            style={[
                styles.half,
                { backgroundColor: color, borderColor: color },
                { width: radius, height: radius * 2, borderRadius: radius },
                {
                    transform: [
                        { translateX: radius / 2 },
                        //   ...transforms,
                        { rotate },
                        { translateX: -radius / 2 },
                        { scale: 1.004 }
                    ]
                },
                otherStyles
            ]}
        />
    );

    const rotate1 = animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1deg']
    });
    const rotate2 = animatedValue2.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1deg']
    });

    const rotate3 = animatedValue3.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1deg']
    });

    const elevation3 = animatedValue3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1]
    });

    return (
        <View style={styles.container} key={done}>
            <View
                style={[
                    styles.outer,
                    { backgroundColor: passiveColor },

                    { borderRadius: radius, height: radius * 2, width: radius * 2 }
                ]}
            >
                {renderHalf(color1, rotate1)}
                {renderHalf(color2, rotate2)}
                {renderHalf(passiveColor, rotate3, {
                    elevation: elevation3,
                    zIndex: elevation3
                })}
                <View
                    style={[
                        {
                            backgroundColor: baseColor,
                            width: 2 * radius - width,
                            height: 2 * radius - width,
                            borderRadius: radius,
                            elevation: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 3
                        }
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: '100%',
                            borderRadius: radius,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {children}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CircleProgress;
