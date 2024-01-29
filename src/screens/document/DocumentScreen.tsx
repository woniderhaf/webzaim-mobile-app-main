import React from 'react';
import { observer } from 'mobx-react';
import { useRoute } from '@react-navigation/native';
import Config from 'react-native-config';
import MainLayout from '../../core/layouts/main-layout';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { DocumentViewerPanel } from '../../core/components';
import { useAuthStore } from '../../store';

const DocumentScreen = () => {
    const route = useRoute<RootStackScreenProps<ROUTES.DOCUMENT>['route']>();
    const { token } = useAuthStore();

    const { url, full } = route.params || {};
    let uri = full ? Config.API_URL || '' : '';

    uri += url.includes('/api') ? url.replace('/api', '') : url;

    return (
        <MainLayout
            theme="gray"
            header={{
                title: 'Документы',
                backButtonShow: true
            }}>
            <DocumentViewerPanel urlToDocument={uri} token={full ? token : undefined} />
        </MainLayout>
    );
};

export default observer(DocumentScreen);
