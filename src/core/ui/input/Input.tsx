import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
    TextInput,
    Text,
    ViewStyle,
    View,
    KeyboardTypeOptions,
    TouchableWithoutFeedback,
    Animated,
    StyleProp,
    TextStyle,
    StyleSheet
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { Easing } from 'react-native-reanimated';
import styles from './styles';

export type InputProps = {
    styleContainer?: StyleProp<ViewStyle>;
    value: any;
    label: string;
    onChange: (value: string) => void;
    style?: StyleProp<TextStyle>;
    errorTextStyle?: StyleProp<TextStyle>;
    type?: KeyboardTypeOptions;
    onFocus?: () => void;
    onBlur?: () => void;
    onPress?: () => void;
    security?: boolean;
    digitOnly?: boolean;
    maxLength?: number;
    error?: string;
    infoText?: string;
    disabled?: boolean;
    trim?: boolean;
    postfix?: React.ReactNode;
    mask?: Array<RegExp | string>;
    masked?: boolean;
    format?: (value: string) => any;
    readOnly?: boolean;
    hint?: string;
};

const Input = React.forwardRef((props: InputProps, ref) => {
    let animatedFocused = useRef(new Animated.Value(0)).current;
    const input = useRef<TextInput>(null);
    const { label, type } = props;
    const [value, setValue] = useState(String(props.value));
    const [focused, setFocused] = useState(false);

    const hasError = Boolean(props.error && props.error.length > 0);

    useEffect(() => {
        return () => {
            setFocused(false);
        };
    }, []);

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]);

    const onChange = (value: string): void => {
        if (props.disabled) {
            return;
        }

        let nextVelue = props.digitOnly ? value.replace(/[^\d]/g, '') : value;

        if (props.trim) {
            nextVelue = nextVelue.trim();
        }

        if (props.format) {
            nextVelue = props.format(nextVelue);
        }

        setValue(nextVelue);
        props.onChange(nextVelue);
    };

    const onFocus = (): void => {
        if (props.disabled) {
            return;
        }

        Animated.timing(animatedFocused, {
            toValue: 1,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: false
        }).start(() => {
            setFocused(true);

            if (input?.current && !focused) {
                input?.current.focus();
            }

            if (props.onFocus) {
                props.onFocus();
            }
        });
    };

    const onBlur = (): void => {
        Animated.timing(animatedFocused, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: false
        }).start(() => {
            setFocused(false);

            if (props.onBlur) {
                props.onBlur();
            }
        });
    };

    useImperativeHandle(ref, () => ({
        blur: () => {
            if (input && input.current) {
                input.current.blur();
            }
        },
        focus: () => {
            if (input && input.current) {
                input.current.focus();
            }
        }
    }));

    const getLabelContainerStyles = useMemo(() => {
        let style = styles.label;

        const height = animatedFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [
                value.length > 0 ? styles.labelFocused.height : styles.label.height,
                styles.labelFocused.height
            ]
            // extrapolate: 'clamp',
        });

        return {
            ...style,
            height
        };
    }, [animatedFocused, value]);

    const getLabel = useMemo(() => {
        let style = styles.labelText;

        const fontSize = focused || value.length > 0 ? styles.labelTextFocused.fontSize : styles.labelText.fontSize;

        const lineHeight =
            focused || value.length > 0 ? styles.labelTextFocused.lineHeight : styles.labelText.lineHeight;

        const color = animatedFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [styles.labelText.color, styles.labelTextFocused.color]
            // extrapolate: 'clamp',
        });

        return {
            ...style,
            color,
            fontSize,
            lineHeight
        };
    }, [animatedFocused, focused, value]);

    const getInputStyles = useMemo(() => {
        let style = styles.input;
        let color = styles.input.color;

        if (props.disabled) {
            color = styles.inputDisabled.color;
        }

        return [{ ...style, color }, props.style];
    }, [animatedFocused, props]);

    const getContainerStyles = useMemo((): ViewStyle => {
        let style = styles.inputContainer;

        const borderBottomColor = props.error
            ? styles.error.color
            : focused
            ? styles.inputContainerFocused.borderBottomColor
            : styles.inputContainer.borderBottomColor;

        return {
            ...style,
            borderBottomColor
        };
    }, [animatedFocused, focused]);

    const renderInput = () => {
        const inputProps = {
            ref: input,
            defaultValue: value,
            value,
            editable: !props.disabled && !props.readOnly,
            allowFontScaling: false,
            keyboardType: type,
            style: getInputStyles,
            onFocus: onFocus,
            onBlur: onBlur,
            secureTextEntry: props.security && type !== 'visible-password',
            onChangeText: onChange,
            blurOnSubmit: true,
            maxLength: props.maxLength,
            onPressIn: props.onPress,
            numberOfLines: 1
        };

        return props.mask ? (
            <MaskInput
                {...inputProps}
                placeholder=""
                onChangeText={(masked, unmasked) => {
                    onChange(props?.masked ? masked : unmasked);
                }}
                mask={props.mask}
            />
        ) : (
            <TextInput {...inputProps} />
        );
    };

    return (
        <View style={StyleSheet.flatten([styles.inputWrapper, props.styleContainer])}>
            <Animated.View style={getContainerStyles}>
                <View style={styles.labelContainer}>
                    <TouchableWithoutFeedback onPress={onFocus} disabled={props.disabled}>
                        <Animated.View style={getLabelContainerStyles}>
                            <Animated.Text style={getLabel}>{label}</Animated.Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
                {renderInput()}
                {props.postfix && <View style={styles.postfix}>{props.postfix}</View>}
            </Animated.View>
            {Boolean(props.hint) && (
                <View style={styles.hintContainer}>
                    <Text style={styles.hint}>{props.hint}</Text>
                </View>
            )}
            <View style={styles.errorContainer}>
                {Boolean(props.error || props.infoText) && (
                    <Text style={[styles.error, props.errorTextStyle]}>{props.error || props.infoText}</Text>
                )}
            </View>
        </View>
    );
});

export default Input;
