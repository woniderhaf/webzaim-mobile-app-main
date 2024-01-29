import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IAccountMoneyTransfer, IPaymentMethodTransfer } from '../../index';
import { Button, ButtonIcon, ButtonList, Icon } from '../../ui';
import { getUserPaymentMethods, putCurrentPaymentMethod, deleteCurrentPaymentMethod } from '../../api';
import { useUIStore } from '../../../store';
import { ButtonApperiance } from '../../enums';
import locale from './locale';
import styles from './styles';

export interface OnAddParams {
    canAddCard?: boolean;
    canAddBankAccount?: boolean;
    cardServiceEndpointRequest?: string;
}

export interface IPaymentMethodsPanelProps {
    onAdd: (params: OnAddParams) => void;
    changeIsLoading: (isLoading: boolean) => void;
    changeIsError: (isError: boolean) => void;
    changeIsContinue?: (isContinue: boolean) => void;
    fetchFinally?: () => void;
    style?: ViewStyle;
    isNeedUpdate?: boolean;
    isRegistration?: boolean;
}

/**
 * @description Панель доступных методов получения.
 * Выполняет функции:
 *  - Выбора метода получения по умолчанию
 *  - Удаление/ добавление метода получения <br/>
 * Самостоятельная еденица кода ( взаимодействующая с бэком )
 * @param {IPaymentMethodsPanelProps} props
 */
const PaymentMethodsPanel = (props: IPaymentMethodsPanelProps) => {
    const {
        style,
        onAdd,
        changeIsLoading,
        changeIsError,
        changeIsContinue,
        isNeedUpdate,
        fetchFinally,
        isRegistration
    } = props;

    const [moneyTransfer, setMoneyTransfer] = useState<IAccountMoneyTransfer>();
    const { setModal } = useUIStore();

    const fetchMoneyTransfer = async () => {
        changeIsLoading(true);

        try {
            const { data } = await getUserPaymentMethods();

            if (data) {
                setMoneyTransfer(data);

                // Проверка на существования выбранного метода по умолчанию
                const isCurrentPaymentMethodExist = data.paymentMethods?.some(
                    paymentMethod => paymentMethod?.current === true
                );

                if (isCurrentPaymentMethodExist) {
                    changeIsContinue?.(true);
                }
            } else {
                changeIsError(true);
            }
        } finally {
            changeIsLoading(false);
        }
    };

    useEffect(() => {
        (() => fetchMoneyTransfer())();
    }, []);

    useEffect(() => {
        !!isNeedUpdate &&
            fetchMoneyTransfer().finally(() => {
                fetchFinally?.();
            });
    }, [isNeedUpdate]);

    const onPress = async (id: string) => {
        try {
            changeIsLoading(true);

            const { status } = await putCurrentPaymentMethod({ id });

            if (status !== 200) {
                changeIsError(true);

                return;
            }

            changeIsError(false);

            if (moneyTransfer?.paymentMethods) {
                const newMoneyTransferDataList = moneyTransfer.paymentMethods.map(paymentMethod => ({
                    ...paymentMethod,
                    current: paymentMethod.id === id
                }));

                setMoneyTransfer({
                    ...moneyTransfer,
                    paymentMethods: newMoneyTransferDataList
                });
                changeIsContinue?.(true);
            }
        } finally {
            changeIsLoading(false);
        }
    };

    const onRemove = async (id: string) => {
        try {
            setModal(null);
            changeIsLoading(true);

            const { status } = await deleteCurrentPaymentMethod({ id });

            if (status !== 200) {
                changeIsError(true);

                return;
            }

            const newPaymentMethodsList =
                moneyTransfer?.paymentMethods.filter(paymentMethod => paymentMethod.id !== id) || [];
            const newMoneyTransfer = moneyTransfer && {
                ...moneyTransfer,
                paymentMethods: newPaymentMethodsList
            };

            setMoneyTransfer(newMoneyTransfer);
            changeIsError(false);
        } finally {
            changeIsLoading(false);
        }
    };

    const onShowRemoveConfirmationModal = (paymentMethod: IPaymentMethodTransfer) => {
        setModal({
            title: locale.removePaymentMethodModal.title,
            message: `${locale.card} ···· ${paymentMethod?.maskedPan?.slice(-4)}`,
            buttons: [
                {
                    label: locale.removePaymentMethodModal.successBtn,
                    onPress: () => onRemove(paymentMethod.id)
                },
                {
                    label: locale.removePaymentMethodModal.cancelBtn,
                    apperiance: ButtonApperiance.WHITE,
                    onPress: () => setModal(null)
                }
            ]
        });
    };

    const canAddNew = (): boolean => {
        if (!moneyTransfer) {
            return false;
        }

        const { canAddCard, canAddBankAccount, cardServiceEndpointRequest } = moneyTransfer;

        return Boolean((canAddCard && cardServiceEndpointRequest) || canAddBankAccount);
    };

    const onAddNew = () => {
        const { canAddCard, canAddBankAccount, cardServiceEndpointRequest } = moneyTransfer || {};

        onAdd({ canAddCard, canAddBankAccount, cardServiceEndpointRequest });
    };

    const renderMethods = () => {
        if (!moneyTransfer || !moneyTransfer?.paymentMethods?.length) {
            return null;
        }

        const { paymentMethods, canDeleteCard, canChangeCard } = moneyTransfer;

        return paymentMethods.map(paymentMethod => {
            //Если все же по каким-то причинам поле пустое то не показываем ничего
            if (!paymentMethod?.maskedPan) {
                return null;
            }
            const mask = paymentMethod?.maskedPan?.slice(-4);

            const title = `${locale.card} ···· ${mask}`;
            const icon = canDeleteCard && !paymentMethod.current && (
                <ButtonIcon name="trash" onPress={() => onShowRemoveConfirmationModal(paymentMethod)} />
            );

            return (
                <ButtonList
                    disabled={!canChangeCard || paymentMethod.current}
                    key={paymentMethod.id}
                    style={styles.buttonContainer}
                    onPress={() => onPress(paymentMethod.id)}
                    icon={icon}
                >
                    <View
                        style={StyleSheet.flatten([
                            styles.buttonBodyContainer,
                            !canChangeCard && !paymentMethod.current && styles.opacity
                        ])}
                    >
                        <View style={styles.buttonIconContainer}>
                            <Icon name={paymentMethod.current ? 'radioInputActive' : 'radioInput'} size={24} />
                        </View>
                        <Text style={styles.buttonTitle}>{title}</Text>
                    </View>
                </ButtonList>
            );
        });
    };

    return moneyTransfer ? (
        <View style={StyleSheet.flatten([styles.container, style])}>
            {renderMethods()}
            <View style={styles.addButton}>
                {isRegistration ? (
                    <ButtonList title={locale.addNewRegistration} disabled={!canAddNew()} onPress={onAddNew} />
                ) : (
                    <Button info value={locale.addNew} disabled={!canAddNew()} onClick={onAddNew} />
                )}
            </View>
        </View>
    ) : null;
};

export default PaymentMethodsPanel;
