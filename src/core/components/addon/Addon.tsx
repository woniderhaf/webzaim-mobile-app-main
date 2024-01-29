import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Button, ButtonLink, Checkbox, Icon } from '../../ui';
import { ButtonProps } from '../../ui/button/Button';
import styles from './styles';

export type AddonProps = {
    title: string;
    selected: boolean;
    icon: string;
    onSelect: (value: boolean) => void;
    onPress?: () => void;
    description?: string;
    disabled?: boolean;
    extended?: boolean;
    isGrace?: boolean;
};

const Addon = (props: AddonProps) => {
    const {
        title,
        selected,
        disabled,
        description,
        extended,
        icon,
        onSelect,
        onPress,
        isGrace
    } = props;

    const renderHeader = () => {
        if (extended) {
            return (
                <>
                    <View style={styles.addonIcon}>
                        <Icon name={icon} size={34} />
                    </View>
                    <View style={styles.addonTitleContainer}>
                        <Text style={styles.addonTitle}>
                            {title}
                        </Text>
                    </View>
                </>
            );
        }

        return (
            <Checkbox
                value={Boolean(selected)}
                label={title}
                style={styles.selectbox}
                onChange={onSelect}
                disabled={disabled}
            />
        );
    };

    const renderDetailsButton = () => {
        if (!onPress) {
            return null;
        }

        if (extended) {
            return (
                <ButtonLink
                    text="Подробнее"
                    onPress={onPress}
                />
            );
        }

        return (
            <Button
                value="Подробнее"
                style={styles.addonBtn}
                onClick={onPress}
            />
        );
    };

    const renderToggleButton = () => {
        const props: ButtonProps = {
            value: selected ? 'В заявке' : 'Добавить',
            style: [styles.addonBtn],
            onClick: () => onSelect(!selected)
        };

        if (isGrace) {
            props.style = [styles.addonBtn, selected ? {} : styles.addonBtnTransparent];
            props.secondary = !selected;
        } else {
            props.style = [styles.addonBtn, selected ? styles.addonBtnTransparentActive : styles.addonBtnTransparent];
            props.secondary = true;
        }

        return <Button {...props} />;
    };

    return (
        <View style={styles.addon}>
            <View style={styles.addonHeader}>
                {renderHeader()}
            </View>
            {description && (
                <Text style={styles.addonDescription}>{description}</Text>
            )}
            <View style={styles.addonControls}>
                {extended && renderToggleButton()}
                {renderDetailsButton()}
            </View>
        </View>
    );
};

export default Addon;
