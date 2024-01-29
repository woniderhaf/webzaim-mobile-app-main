import React, { Ref, useCallback, useMemo } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import FileSelector from './FileSelector';
import styles from './styles';

interface IAttachFileModal {
    modalRef?: Ref<BottomSheetModal>;
    webViewRef?: Ref<WebView>;
    onSelectFile: (fileBase64: string) => void;
}

const AttachFileModal = (props: IAttachFileModal) => {
    const { modalRef, onSelectFile } = props;

    const snapPoints = useMemo(() => ['50%', '70%'], []);

    const renderBackdrop = useCallback(
        (backdropProps: BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...backdropProps}
                disappearsOnIndex={-1.01}
                appearsOnIndex={0}
                opacity={0.4}
                enableTouchThrough={true}
                pressBehavior="close"
            />
        ),
        []
    );

    const onMessage = (event: WebViewMessageEvent) => {
        if (event.nativeEvent.data) {
            onSelectFile(event.nativeEvent.data);
        }
    };

    return (
        <BottomSheetModal
            ref={modalRef}
            snapPoints={snapPoints}
            backgroundStyle={styles.backgroundContainer}
            backdropComponent={renderBackdrop}
        >
            <WebView bounces={false} source={{ html: FileSelector }} onMessage={onMessage} />
        </BottomSheetModal>
    );
};

export default AttachFileModal;
