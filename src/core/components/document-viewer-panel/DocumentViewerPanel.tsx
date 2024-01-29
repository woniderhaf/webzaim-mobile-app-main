import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import Config from 'react-native-config';
import PDFView from 'react-native-view-pdf';
import axios from 'axios';
import { BoxPreloader, ErrorMessage } from '../../ui';
import { GLOBAL_ERROR_TEXT } from '../../constants';
import styles from './styles';

export interface DocumentViewerPanelProps {
    urlToDocument: string;
    token?: string;
}

const DocumentViewerPanel = (props: DocumentViewerPanelProps) => {
    const { urlToDocument, token = undefined } = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [document, setDocument] = useState<string>();
    const [error, setError] = useState(false);

    const headers = token && {
        Authorization: `Bearer ${token}`,
        'X-APP-TOKEN': Platform.select({
            ios: Config.X_APP_TOKEN_IOS,
            android: Config.X_APP_TOKEN_ANDROID,
            default: ''
        }),
        'Content-Type': 'application/pdf'
    };

    const onLoadEnd = () => {
        setIsLoading(false);
    };
    const onLoadError = () => {
        onLoadEnd();
        setError(true);
    };

    useEffect(() => {
        (async () => {
            try {
                const arrayBuffer = await axios.get(urlToDocument, {
                    responseType: 'arraybuffer',
                    headers: { ...headers }
                });
                const documentToBase64 = Buffer.from(arrayBuffer.data, 'binary').toString('base64');

                setDocument(documentToBase64);
            } catch (e) {
                onLoadError();
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            {error && (
                <View style={styles.errorMessageContainer}>
                    <ErrorMessage message={GLOBAL_ERROR_TEXT} />
                </View>
            )}

            {!!document && (
                <PDFView
                    style={styles.pdf}
                    fadeInDuration={250.0}
                    resource={document}
                    resourceType={'base64'}
                    onLoad={onLoadEnd}
                    onError={onLoadError}
                />
            )}
            {isLoading && (
                <View style={styles.overlay}>
                    <View style={styles.loaderContainer}>
                        <BoxPreloader />
                    </View>
                </View>
            )}
        </View>
    );
};

export default DocumentViewerPanel;
