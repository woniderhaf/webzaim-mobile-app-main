import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { useCommonStore, useUIStore } from '../../../../store';
import { LoanRequestButton, HtmlView } from '../../../../core/components';
import locale from './locale';
import styles from './styles';

const AboutScreen = () => {
    const { about, fetchAbout } = useCommonStore();
    const { loading } = useUIStore();

    useEffect(() => {
        (async () => {
            if (!about) {
                await fetchAbout();
            }
        })();
    }, []);

    const renderContent = useMemo(() => {
        if (!about) {
            return null;
        }

        return (
            <View style={styles.container}>
                {about.blocks.map((block) => (
                    <View key={block.id}>
                        {block.text && <HtmlView html={block.text} />}
                    </View>
                ))}
                <LoanRequestButton />
            </View>
        );
    }, [about]);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                {!loading && renderContent}
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(AboutScreen);
