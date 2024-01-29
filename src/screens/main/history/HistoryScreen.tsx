import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import { HIstoryItemStatusTypes } from '../../../core/enums';
import { IHistoryItem } from '../../../core/interfaces';
import { MainTabsProps, ROUTES } from '../../../navigation';
import { useHistoryStore, useLoanStore, useUIStore } from '../../../store';
import { HistoryItem, LoanRequestButton } from '../../../core/components';
import { Button, ButtonToggle } from '../../../core/ui';
import locale from './locale';
import styles from './styles';

const HistoryScreen = () => {
    const navigation = useNavigation<MainTabsProps<ROUTES.HISTORY>['navigation']>();
    const { loading } = useUIStore();
    const { getHistory, fetchHistory, setFilter, filterByStatus, history } = useHistoryStore();
    const { activeLoan } = useLoanStore();

    useEffect(() => {
        fetchHistory();
    }, []);

    const renderHistory = ({ item }: { item: IHistoryItem }) => {
        return (
            <View style={styles.itemWrapper}>
                <HistoryItem data={item}/>
            </View>
        );
    };

    const renderFilters = () => {
        return (
            <View style={styles.header}>
                <View>
                    <ButtonToggle
                        label={locale.filters.all}
                        selected={!filterByStatus}
                        onPress={() => setFilter()}
                    />
                </View>
                <View style={{ marginLeft: 8 }}>
                    <ButtonToggle
                        label={locale.filters.repaid}
                        selected={filterByStatus === HIstoryItemStatusTypes.REPAID}
                        onPress={() => setFilter(HIstoryItemStatusTypes.REPAID)}
                    />
                </View>
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <LoanRequestButton />
            </View>
        );
    };

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle
            }}
        >
            <View style={{ flex: 1 }}>
                {!loading && (
                    <FlatList
                        data={getHistory}
                        renderItem={renderHistory}
                        keyExtractor={(item) => item.documentNumber}
                        ListHeaderComponent={history.length ? renderFilters : null}
                        ListFooterComponent={activeLoan ? null : renderFooter}
                    />
                )}
            </View>
        </MainLayout>
    );
};

export default observer(HistoryScreen);
