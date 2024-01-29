import React, { useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Modal, View } from 'react-native';
import { IDropdownOption } from '../../types';
import { Icon } from '../icons';
import ReadonlyField from '../readonly-field';
import styles from './styles';

export interface DropdownProps {
    label: string;
    data: Array<IDropdownOption>;
    onSelect: (item: IDropdownOption) => void;
    defaultValue?: string;
    disabled?: boolean;
    error?: string;
    hint?: string;
}

const Dropdown = ({ label, data, onSelect, defaultValue, disabled, error, hint }: DropdownProps) => {
    const DropdownButton = useRef<TouchableOpacity>(null);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<IDropdownOption | undefined>(
        data.find((option) => option.id === defaultValue)
    );
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = (): void => {
        if (disabled) {
            return;
        }

        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        if (disabled) {
            return;
        }

        if (DropdownButton.current) {
            DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
                setDropdownTop(py + h);
            });
            setVisible(true);
        }
    };

    const onItemPress = (item: IDropdownOption): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }: { item: IDropdownOption }) => (
        <TouchableOpacity
            style={[styles.item, selected && selected.id === item.id && styles.itemSelected]}
            onPress={() => onItemPress(item)}
        >
            <Text style={styles.label}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View
                        style={[
                            styles.dropdown,
                            {
                                top: dropdownTop,
                                maxHeight: data.length > 5 ? '45%' : 'auto'
                            }
                        ]}
                    >
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <>
            <TouchableOpacity ref={DropdownButton} style={styles.button} disabled={disabled} onPress={toggleDropdown}>
                {renderDropdown()}
                <View style={styles.buttonText}>
                    <ReadonlyField
                        label={selected ? label : ''}
                        style={!disabled ? styles.active : undefined}
                        value={String((selected && selected.title) || label)}
                    />
                </View>
                <Icon name={visible ? 'angleUp' : 'angleDown'} size={24} />
            </TouchableOpacity>
            {Boolean(hint) && (
                <View style={styles.hintContainer}>
                    <Text style={styles.hint}>{hint}</Text>
                </View>
            )}
            <View style={styles.errorContainer}>{Boolean(error) && <Text style={styles.error}>{error}</Text>}</View>
        </>
    );
};

export default Dropdown;
