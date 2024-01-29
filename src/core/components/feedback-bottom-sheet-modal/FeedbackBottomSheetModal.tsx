import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import Config from 'react-native-config';
// import { useNavigation } from '@react-navigation/native';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useUIStore } from '../../../store';
// import { ROUTES } from '../../../navigation';
import { clearPhoneMask } from '../../utils';
import styles from './styles';

const FeedbackBottomSheetModal = () => {
    // const navigation = useNavigation();
    const { feedbackBottomSheetModal, setFeedbackBottomSheetModal } = useUIStore();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (feedbackBottomSheetModal) {
            bottomSheetModalRef.current?.present();
        }
    }, [feedbackBottomSheetModal]);

    const snapPoints = useMemo(() => ['20%', '20%'], []);

    const menuItems = useMemo(() => [
        // @TODO chat
        // {
        //     label: 'Чат с оператором',
        //     onClick: () => {
        //         navigation.navigate(ROUTES.ERROR);
        //         bottomSheetModalRef.current?.dismiss();
        //     }
        // },
        {
            label: Config.PHONE,
            onClick: () => Linking.openURL(`tel:${clearPhoneMask(Config.PHONE)}`)
        }
    ],  []);

    const renderItem = useCallback(({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={item.onClick}>
                <Text style={styles.itemLabel}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    ), []);

    const renderBackdrop = useCallback((props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
            pressBehavior="close"
        />
    ), []);

    const hideModal = useCallback(() => setFeedbackBottomSheetModal(false), []);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onDismiss={hideModal}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetFlatList
                data={menuItems}
                keyExtractor={(i) => String(i.label)}
                renderItem={renderItem}
            />
        </BottomSheetModal>
    );
};

export default observer(FeedbackBottomSheetModal);
