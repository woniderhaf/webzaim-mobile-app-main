import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { BoxShadow, Button, ButtonIcon, Icon, ErrorMessage } from '../../../../core/ui';
import { AttachFileModal } from '../../../../core/components';
import { getCurrentLoan, patchUserProfile, setFiles } from '../../../../core/api';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { useLoanStore } from '../../../../store';
import styles from './styles';
import locale from './locale';
import { IScanItem, IScanItemExample } from './PassportScanScreenProps';

const PassportScanScreen = () => {
    const store = useLoanStore();
    const modalRef = useRef<BottomSheetModal>(null);
    const navigation = useNavigation<LoansScreenProps<ROUTES.PASSPORT_SCAN>['navigation']>();
    const [file, setFile] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    /**
     * @description Элемент выбора изображения
     * @param {IScanItemExample} props
     * @constructor
     */
    const ScanItemExample = (props: IScanItemExample) => {
        const { onPressAttachFile } = props;
        const passportPlug = require(`../../../../../assets/images/passport-example.png`);

        return (
            <BoxShadow paddingVertical={16} paddingHorizontal={12}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textItemExample}>{locale.mainPage}</Text>
                    </View>
                    <Image style={styles.image} source={passportPlug} />
                </View>
                <Button value={locale.attachFile} onClick={onPressAttachFile} style={styles.buttonContainer} />
            </BoxShadow>
        );
    };

    /**
     * @description Элемент выбранного изображения
     * @param {IScanItem} props
     * @constructor
     */
    const ScanItem = (props: IScanItem) => {
        const { imageByBase64, onPressRemove } = props;

        return (
            <BoxShadow paddingVertical={16} paddingHorizontal={12}>
                <View style={styles.row}>
                    <Image style={styles.image} source={{ uri: imageByBase64 }} />
                    <View style={styles.contentContainer}>
                        <View style={styles.row}>
                            <Icon name={'greenCircleCheck'} size={16} />
                            <Text style={styles.fileLoadedText}>{locale.loadComplete}</Text>
                        </View>
                        <Text style={styles.textItem}>{locale.mainPage} </Text>
                    </View>
                    <ButtonIcon name={'trash'} onPress={onPressRemove} />
                </View>
            </BoxShadow>
        );
    };

    /**
     * @description Обработчик нажатия для выбора изображения
     */
    const onPressAttachFile = () => {
        modalRef.current?.present();
    };

    /**
     * @description Обработчик нажатия удаления выбранного изображения
     */
    const removeScanPassport = () => {
        setFile(undefined);
    };

    /**
     * @description Обработчик загрузки изображения на бэк
     * Получается id изображдения -> прикрепляет id к profile пользователя
     */
    const onPressContinue = async () => {
        try {
            setIsError(false);
            setIsLoading(true);

            const { data } = (file && (await setFiles(file))) || {};

            data?.id && file && setFile(file);

            data?.id && (await patchUserProfile({ passportScans: { mainPage: data.id } }));

            const loan = await getCurrentLoan();

            loan?.data && store.setActiveLoan(loan.data);

            setIsLoading(false);
            navigation.goBack();
        } catch (e) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const onSelectFile = async (fileBase64: string) => {
        modalRef.current?.close();
        setFile(fileBase64);
    };

    return (
        <MainLayout
            theme="gray"
            loading={isLoading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <View style={styles.container}>
                <View>
                    {isError && <ErrorMessage message={GLOBAL_ERROR_TEXT} />}
                    {file ? (
                        <ScanItem imageByBase64={file} onPressRemove={removeScanPassport} />
                    ) : (
                        <ScanItemExample onPressAttachFile={onPressAttachFile} />
                    )}
                </View>
                {file && (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.textDescription}>{locale.description}</Text>
                        <Button value={locale.continue} onClick={onPressContinue} />
                    </View>
                )}
            </View>
            <AttachFileModal modalRef={modalRef} onSelectFile={onSelectFile} />
        </MainLayout>
    );
};

export default PassportScanScreen;
