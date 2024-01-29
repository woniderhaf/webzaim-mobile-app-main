import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { ButtonLink, ErrorMessage } from '../../../../core/ui';
import { GLOBAL_ERROR_TEXT } from '../../../../core/constants';
import styles from './styles';

const LoanAddonDescriptionScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_ADDON_DESCRIPTION>['navigation']>();
    const route = useRoute<LoansScreenProps<ROUTES.LOAN_ADDON_DESCRIPTION>['route']>();

    const { text, name, docUrl, docTitle } = route?.params || {};

    const [description, setDescription] = useState(text);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // useFocusEffect(() => {
    //     const { text } = params;

    //     if (!text) {
    //         setError(true);
    //     } else {
    //         setDescription(text);
    //     }

    //     setLoading(false);

    //     return () => {
    //         setLoading(true);
    //     }
    // });

    const onDocumentPress = () => {
        navigation.goBack();
        navigation.navigate(ROUTES.DOCUMENT, { url: docUrl || '' });
    };

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: name || 'Подробнее',
                backButtonShow: true
            }}
        >
            <View style={styles.container}>
                {error
                    ? (<ErrorMessage message={GLOBAL_ERROR_TEXT} />)
                    : (
                        <>
                            {description.length > 0 &&  (
                                <Text style={styles.description}>
                                    {description}
                                </Text>
                            )}
                            {docUrl && (
                                <ButtonLink
                                    text={docTitle || 'Подробнее'}
                                    onPress={onDocumentPress}
                                />
                            )}
                        </>
                    )
                }
            </View>
        </MainLayout>
    );
};

export default observer(LoanAddonDescriptionScreen);
