import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Button, Input } from '../../ui';
import { InputProps } from '../../ui/input';
import { ButtonProps } from '../../ui/button';
import { checkPromoCode } from '../../api';
import styles from './styles';

interface IPromoCodeProps {
    onSuccess?: (promoCode: string) => void;
    style?: StyleProp<ViewStyle>;
}

type StateLifeCycle = 'STANDBY' | 'ACTIVE' | 'ERROR' | 'LOADING' | 'APPLY';
interface IState {
    input: Omit<InputProps, 'value' | 'label' | 'onChange'> & { label: string; isHide?: boolean };
    button: Omit<ButtonProps, 'onClick'>;
}

const DefaultState: IState = {
    input: { label: 'Введите промокод', isHide: true },
    button: { value: 'У меня есть промокод' }
};

const PromoCode = (props: IPromoCodeProps) => {
    const { onSuccess, style } = props;
    const [state, setState] = useState<IState>(DefaultState);
    const [promoCode, setPromoCode] = useState('');
    const [stateLifeCycle, setStateLifeCycle] = useState<StateLifeCycle>('STANDBY');

    const reducer = (lifeCycle: StateLifeCycle): IState => {
        switch (lifeCycle) {
            case 'STANDBY': {
                return {
                    input: { ...DefaultState.input, isHide: true },
                    button: {
                        ...DefaultState.button,
                        secondary: true
                    }
                };
            }
            case 'ACTIVE': {
                return {
                    input: {
                        label: 'Введите промокод'
                    },
                    button: {
                        value: 'Применить'
                    }
                };
            }
            case 'APPLY': {
                return {
                    input: {
                        disabled: true,
                        label: 'Введите промокод',
                        style: styles.applyText,
                        infoText: 'Промокод успешно применен',
                        errorTextStyle: styles.infoTextApply
                    },
                    button: {
                        value: 'Отменить',
                        secondary: true
                    }
                };
            }
            case 'ERROR': {
                const isEmpty = promoCode.length < 1;

                return {
                    input: {
                        ...state.input,
                        error: isEmpty ? 'Пожалуйста, введите промокод' : 'Промокод недействителен',
                        style: !isEmpty && styles.errorText
                    },
                    button: {
                        ...state.button,
                        isLoading: undefined
                    }
                };
            }
            case 'LOADING': {
                return { input: { ...state.input }, button: { ...state.button, isLoading: true } };
            }
        }
    };

    useEffect(() => {
        setState(reducer(stateLifeCycle));
    }, [stateLifeCycle]);

    const onChange = (text: string) => {
        if (text.trim().length > 0 && stateLifeCycle === 'ERROR') {
            setStateLifeCycle('ACTIVE');
        }
        setPromoCode(text.trim());
    };

    const onActive = () => {
        setStateLifeCycle('ACTIVE');
    };

    const onCheck = async () => {
        if (promoCode?.length < 1) {
            setStateLifeCycle('ERROR');

            return;
        }
        try {
            setStateLifeCycle('LOADING');

            const result = await checkPromoCode(promoCode);

            console.log(result, 'RESULT');
            result.data?.status === 'OK' ? setStateLifeCycle('APPLY') : setStateLifeCycle('ERROR');

            onSuccess?.(promoCode);
        } catch (e) {
            setStateLifeCycle('ERROR');
        }
    };

    const onCancel = () => {
        setPromoCode('');
        setStateLifeCycle('STANDBY');
    };

    const getActionByLifeCycle = () => {
        switch (stateLifeCycle) {
            case 'STANDBY':
                onActive();
                break;

            case 'ACTIVE':
            case 'ERROR':
                onCheck();
                break;

            case 'APPLY':
                onCancel();
                break;
        }
    };

    return (
        <View style={style}>
            {!state.input.isHide && (
                <Input styleContainer={styles.inputContainer} value={promoCode} onChange={onChange} {...state.input} />
            )}
            <Button {...state.button} onClick={getActionByLifeCycle} />
        </View>
    );
};

export default PromoCode;
