import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Modal as RNModal, View } from 'react-native';
import { ModalProps } from '../../types';
import BoxShadow from '../box-shadow';
import Button from '../button';
import { Icon } from '../icons';
import ReadonlyField from '../readonly-field';
import styles from './styles';

const Modal = (props: ModalProps) => {
    const DropdownButton = useRef<TouchableOpacity>(null);
    const [visible, setVisible] = useState(false);
    const [dropdownTop, setDropdownTop] = useState(0);

    useEffect(() => {
        if (DropdownButton.current) {
            DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
                setDropdownTop(py + h);
            });
            setVisible(true);
        }
    }, [DropdownButton]);

    const renderButtons = () => (
        <View style={[styles.buttons, props.verticalButtons && styles.buttonsVertical]}>
            {props.buttons.map((btn, index) => (
                <View
                    key={btn.label}
                    style={[
                        styles.buttonContainer,
                        props.verticalButtons && styles.buttonContainerVertical,
                        index === 0 && styles.buttonContainerFirst
                    ]}
                >
                    <Button
                        value={btn.label}
                        apperience={btn.apperiance}
                        onClick={btn.onPress}
                    />
                </View>
            ))}
        </View>
    );

    return (
        <RNModal visible transparent animationType="none">
            <TouchableOpacity
                style={styles.overlay}
                disabled
                onPress={() => {}}
            >
                <View
                    ref={DropdownButton}
                    style={styles.modal}>
                    <View style={{ width: '100%' }}>
                        <BoxShadow paddingHorizontal={16} paddingVertical={24}>
                            {props.title && (<Text style={styles.modalTitle}>{props.title}</Text>)}
                            {props.message && (
                                <Text style={[styles.modalDescription, { marginTop: props.title ? 14 : 0 }]}>
                                    {props.message}
                                </Text>
                            )}
                            {renderButtons()}
                        </BoxShadow>
                    </View>
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};

export default Modal;
