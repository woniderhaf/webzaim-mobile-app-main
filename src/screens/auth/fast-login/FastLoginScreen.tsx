import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import { NAVIGATION_LOGOUT_ACTION, RootStackScreenProps, ROUTES } from '../../../navigation';
import { useAuthStore, useRootStore, useUIStore } from '../../../store';
import { ButtonApperiance, FastLoginActions } from '../../../core/enums';
import { postLogout } from '../../../core/api';
import { authWithBiometrics } from '../../../core/biometrics';
import { PincodeKeyboard } from '../../../core/components';
import Checkbox from '../../../core/ui/checkbox';
import locale from './locale';
import styles from './styles';

interface IStep {
    title: string;
    value: string;
    validate: (code: string, data: StepData) => boolean;
}

type StepData = {
    savedCode: string; // stored in local storage
    [key: string]: string;
};

type IStepConfig = Record<FastLoginActions, Array<IStep>>;

const PIN_CODE_LENGTH = 4;

const STEPS: IStepConfig = {
    [FastLoginActions.CREATE]: [
        {
            title: locale.createCode,
            value: 'pincode',
            validate: (code) => {
                return code.length === PIN_CODE_LENGTH;
            }
        },
        {
            title: locale.repeatCode,
            value: 'repeatPincode',
            validate: (code, data) => {
                return Boolean(
                    code.length === PIN_CODE_LENGTH
                    && data?.pincode
                    && code === data.pincode)
                ;
            }
        }
    ],
    [FastLoginActions.ENTER]: [
        {
            title: locale.enterCode,
            value: 'pincode',
            validate: (code, data) => {
                return Boolean(
                    code.length == PIN_CODE_LENGTH
                    && data.savedCode
                    && code === data.savedCode
                );
            }
        }
    ],
    [FastLoginActions.CHANGE]: [
        {
            title: locale.enterOldCode,
            value: 'oldPincode',
            validate: (code, data) => {
                return Boolean(
                    code.length == PIN_CODE_LENGTH
                    && data.savedCode
                    && code === data.savedCode
                );
            }
        },
        {
            title: locale.enterNewCode,
            value: 'newPincode',
            validate: (code: string) => {
                return code.length === PIN_CODE_LENGTH;
            }
        },
        {
            title: locale.repeatNewCode,
            value: 'repeatPincode',
            validate: (code: string, data: Record<any, any>) => {
                return code.length === PIN_CODE_LENGTH
                    && data.newPincode
                    && code === data.newPincode;
            }
        }
    ]
};

const FastLoginScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.FAST_LOGIN>['navigation']>();
    const route = useRoute<RootStackScreenProps<ROUTES.FAST_LOGIN>['route']>();
    const store = useAuthStore();
    const { sensor } = useRootStore();
    const { setModal, setLoading } = useUIStore();
    const [stepIndex, setStepIndex] = useState(0);
    const [useBiometrics, setUseBiometrics] = useState(store.useBiometrics);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const { action = FastLoginActions.ENTER, backUrl, validateSession } = route.params || {};
    const $steps: Array<IStep> = STEPS[action as FastLoginActions];
    const currentStep = $steps[stepIndex];

    const [data, setData] = useState<StepData>({
        savedCode: store.pinCode,
        [currentStep.value]: ''
    });

    useEffect(() => {
        if (action === FastLoginActions.ENTER) {
            if (validateSession) {
                checkSession();
            } else if (useBiometrics) {
                useBiometricsAuth();
            }
        }
    }, []);

    useEffect(() => {
        const checkStep = async () => {
            const isValid = currentStep.validate(code, data);

            if (isValid) {
                if (stepIndex === $steps.length - 1) {
                    if (action === FastLoginActions.CHANGE) {
                        onSuccessChange();
                    } else {
                        login();
                    }
                } else {
                    changeStep(stepIndex + 1);
                }
            } else {
                setError(locale.pincodeError);
            }
        };

        if (code && code.length === PIN_CODE_LENGTH) {
            checkStep();
        }
    }, [code, error, stepIndex]);

    const changeStep = (index: number) => {
        const nextStep = $steps[index];
        let nextValue = '';

        if (index < stepIndex) {
            const prevValue = data[nextStep.value];

            nextValue = prevValue.slice(0, code.length - 1);
        }

        setStepIndex(index);
        setData({ ...data, [nextStep.value]: nextValue });
        setCode(nextValue);
    };

    const onPressBtn = (value: number) => {
        const $value = code + value;

        if ($value.length > PIN_CODE_LENGTH) {
            return;
        }

        setCode($value);
        setData({ ...data, [currentStep.value]: $value });
    };

    const onSuccessChange = async () => {
        store.changePinCode(code, useBiometrics);

        setModal({
            title: locale.successModal.title,
            buttons: [
                {
                    label: locale.successModal.successBtn,
                    onPress: () => {
                        setModal(null);
                        navigation.goBack();
                    }
                }
            ]
        });
    };

    const onLogout = () => {
        setModal({
            title: locale.logoutModal.title,
            buttons: [
                {
                    label: locale.logoutModal.successBtn,
                    onPress: logout
                },
                {
                    label: locale.logoutModal.cancelBtn,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => setModal(null)
                }
            ]
        });
    };

    const onForgotCode = () => {
        setModal({
            title: locale.forgotModal.title,
            message: locale.forgotModal.message,
            buttons: [
                {
                    label: locale.forgotModal.successBtn,
                    onPress: logout
                },
                {
                    label: locale.forgotModal.cancelBtn,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => setModal(null)
                }
            ]
        });
    };

    const onRemove = () => {
        if (error.length) {
            setError('');
        }

        if (code) {
            setCode(code.slice(0, code.length - 1));
        } else if (stepIndex > 0) {
            changeStep(stepIndex - 1);
        }
    };

    const onChangeBiometrics = (checkbox: boolean) => {
        setUseBiometrics(checkbox);
        store.setUseBiometrics(checkbox);
    };

    const login = async (pinCode?: string) => {
        setLoading(true);

        try {
            await store.loginPincode(pinCode || code, useBiometrics);

            if (backUrl) {
                navigation.replace(backUrl);
            } else {
                navigation.replace(ROUTES.WELCOME);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            await store.logout();
        } finally {
            setModal(null);
            navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
        }
    };

    const useBiometricsAuth = async () => {
        const success = await authWithBiometrics();

        if (success) {
            await login(data.savedCode);
        }
    };

    const checkSession = async () => {
        setLoading(true);

        try {
            const valid = await store.updateSession();

            if (valid && useBiometrics) {
                await useBiometricsAuth();
            } else {
                navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
            }
        } finally {
            setLoading(false);
        }
    };

    const leftKeyboardButton = useCallback(() => {
        if (action === FastLoginActions.ENTER) {
            return {
                onPress: onLogout,
                text: locale.logout
            };
        }

        return undefined;
    }, [action]);

    const rightKeyboardButton = useCallback(() => {
        if (code.length || stepIndex > 0) {
            return {
                onPress: onRemove,
                icon: 'backspace'
            };
        }

        if (action === FastLoginActions.ENTER && useBiometrics) {
            return {
                onPress: useBiometricsAuth,
                icon: 'faceid'
            };
        }

        return undefined;
    }, [action, stepIndex, code, useBiometrics]);

    const renderProgress = useCallback(() => {
        return new Array(PIN_CODE_LENGTH)
            .fill(1)
            .map((_, index) => (
                <View
                    key={String(index)}
                    style={[styles.dot, index <= code.length - 1 && styles.dotActive]}
                />
            ));
    }, [code]);

    return (
        <MainLayout
            theme="gray"
            edges={['top', 'bottom']}
            header={{
                title: action === FastLoginActions.CHANGE ? locale.changeScreenTitle : locale.screenTitle,
                backButtonShow: action === FastLoginActions.CHANGE
            }}
        >
            <View style={styles.screen}>
                <View style={styles.pinCodeContainer}>
                    <Text style={styles.pinCodeLabel}>
                        {currentStep.title}
                    </Text>
                    <View style={styles.pinCode}>
                        {renderProgress()}
                    </View>
                    <View style={styles.pinCodeError}>
                        {error.length > 0 && (
                            <Text style={styles.pinCodeErrorText}>{error}</Text>
                        )}
                    </View>
                    <View style={styles.subActions}>
                        {action === FastLoginActions.ENTER ? (
                            <TouchableOpacity onPress={onForgotCode}>
                                <Text style={styles.link}>{locale.forgotCode}</Text>
                            </TouchableOpacity>
                        ) : (
                            <Checkbox
                                value={useBiometrics}
                                label={locale.useBiometrics}
                                disabled={!sensor}
                                onChange={onChangeBiometrics}
                            />
                        )}
                    </View>
                </View>
                <PincodeKeyboard
                    onPressBtn={onPressBtn}
                    leftButton={leftKeyboardButton()}
                    rightButton={rightKeyboardButton()}
                />
            </View>
        </MainLayout>
    );
};

export default observer(FastLoginScreen);
