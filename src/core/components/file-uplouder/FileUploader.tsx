import React, { useCallback } from 'react';
import { View } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import { FilePicker, InfoText } from '../../ui';
import styles from './styles';

export type FileUploaderProps = {
    label: string;
    description?: string;
    onLoud?: () => {}
};

const FileUploader = ({
    label = 'Добавить',
    description = 'Разрешено загружать файлы в формате png, jpeg, pdf. Размер файла не более 10 Мб.'
}: FileUploaderProps) => {
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pickMultiple({
                presentationStyle: 'fullScreen',
                type: [types.images]
            });
        } catch (err) {
        //   console.warn(err);
        }
    }, []);

    return (
        <View style={styles.container}>
            {Boolean(description) && (
                <View style={styles.hint}>
                    <InfoText value={description} />
                </View>
            )}
            <View style={styles.content}>
                <FilePicker label={label} onPress={handleDocumentSelection} />
            </View>
        </View>
    );
};

export default FileUploader;
