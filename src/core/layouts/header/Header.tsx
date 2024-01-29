import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUIStore } from '../../../store';
import useLog from '../../hooks/useLog';
import { LayoutHeaderProps } from '../..';
import { ButtonIcon, Icon } from '../../ui';
import styles from './styles';

const Header = ({ title, backButtonShow, contrast, rightButtons, onBackPress, white }: LayoutHeaderProps) => {
    const navigation = useNavigation();
    const { setFeedbackBottomSheetModal } = useUIStore();
    const [onLogPress, onLogLongPress, IS_PRODUCTION] = useLog();
    const [rightContainerWidth, setRightContainerWidth] = useState(0);
    const [leftContainerWidth, setLeftContainerWidth] = useState(0);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            onBackHandler();

            return true;
        });

        return () => backHandler.remove();
    }, []);

    const onBackHandler = () => {
        Keyboard.dismiss();

        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const HeaderRightButtons = useMemo(() => {
        const buttons = [
            {
                icon: 'phone',
                onClick: () => setFeedbackBottomSheetModal(true)
            }
        ];

        return [...(rightButtons || []), ...buttons].map((button, index) => {
            return (
                <TouchableOpacity
                    onPress={button.onClick}
                    key={String(index)}
                    style={{ marginLeft: index > 0 ? 14 : 0 }}
                >
                    <Icon name={contrast ? `${button.icon}Contrast` : button.icon} size={24} />
                </TouchableOpacity>
            );
        });
    }, [rightButtons]);

    return (
        <View style={[styles.header, contrast && styles.headerContrast, white && styles.headerWhite]}>
            <View onLayout={event => setLeftContainerWidth(event.nativeEvent.layout.width)}>
                {backButtonShow && (
                    <ButtonIcon
                        style={{ width: 40 }}
                        name={contrast ? 'arrowLeftContrast' : 'arrowLeft'}
                        onPress={onBackHandler}
                    />
                )}
            </View>
            <View
                style={[
                    styles.titleContainer,
                    {
                        paddingLeft: !leftContainerWidth ? rightContainerWidth : 0,
                        paddingRight: !rightContainerWidth ? leftContainerWidth : 0
                    }
                ]}
            >
                {title && (
                    <TouchableOpacity disabled={IS_PRODUCTION} onLongPress={onLogLongPress}>
                        <Text numberOfLines={1} style={[styles.title, contrast && styles.titleContrast]}>
                            {title}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <View
                style={styles.rightActions}
                onLayout={event => setRightContainerWidth(event.nativeEvent.layout.width)}
            >
                {HeaderRightButtons}
            </View>
        </View>
    );
};

export default Header;
