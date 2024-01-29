import React from 'react';
import { observer } from 'mobx-react';
import { useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { DocumentViewerPanel } from '../../../../core/components';

// @TODO объеденить с экраном DOCUMENTS Удалить этот экран/ не используется

const LoanDocumentsScreen = () => {
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_DOCUMENTS>['route']>();

    const { documentsUrl } = route.params || {};

    return (
        <MainLayout
            theme="gray"
            header={{
                title: 'Документы22',
                backButtonShow: true
            }}>
            <DocumentViewerPanel urlToDocument={documentsUrl} />
        </MainLayout>
    );
};

export default observer(LoanDocumentsScreen);
