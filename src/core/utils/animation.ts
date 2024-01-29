import { Animated } from 'react-native';

export const fadeIn = (target: Animated.Value | Animated.ValueXY, callback?: Animated.EndCallback | undefined, duration?: number) => {
    Animated.timing(target, {
        toValue: 1,
        duration: duration || 500,
        useNativeDriver: true
    }).start((result) => callback && callback(result));
};

export const fadeOut = (target: Animated.Value | Animated.ValueXY, callback?: Animated.EndCallback | undefined) => {
    Animated.timing(target, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    }).start((result) => callback && callback(result));
};

export const timing = (target: Animated.Value | Animated.ValueXY, value: any, callback?: Animated.EndCallback | undefined) => {
    Animated.timing(target, {
        toValue: value,
        duration: 300,
        useNativeDriver: true
    }).start((result) => callback && callback(result));
};

export const parallel = (animations: Animated.CompositeAnimation, callback?: Animated.EndCallback | undefined) => Animated.parallel([animations]).start((result) => callback && callback(result));
