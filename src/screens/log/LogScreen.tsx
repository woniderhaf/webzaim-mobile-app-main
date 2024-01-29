import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../core/layouts/main-layout';
import { LogItem } from '../../core/components';
import { NAVIGATION_LOGOUT_ACTION } from '../../navigation';
import { DadataApi, WebzaimApi } from '../../core/api';

const getAPILogList = (isReverse: boolean) => {
    const list = [...WebzaimApi.getLog(), ...DadataApi.getLog()];

    return isReverse ? list.reverse() : list;
};
const LogScreen = () => {
    const navigation = useNavigation();
    const [isReverse, setIsReverse] = useState(true);
    const [apiLogList, setApiLogList] = useState(getAPILogList(isReverse));

    useEffect(() => {
        setApiLogList(getAPILogList(isReverse));
    }, [isReverse]);

    const onRefresh = () => {
        setApiLogList(getAPILogList(isReverse));
    };

    return (
        <MainLayout
            theme="gray"
            header={{
                title: 'Log',
                backButtonShow: true,
                onBackPress: () => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        navigation.dispatch(NAVIGATION_LOGOUT_ACTION);
                    }
                },
                rightButtons: [
                    {
                        icon: 'clock',
                        onClick: () => {
                            setIsReverse(!isReverse);
                        }
                    }
                ]
            }}
        >
            <FlatList
                refreshing={false}
                onRefresh={onRefresh}
                data={apiLogList}
                renderItem={({ item, index }) => <LogItem item={item} index={index} />}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: '#3e3e3e', marginTop: 2, marginBottom: 16 }} />
                )}
            />
        </MainLayout>
    );
};

export default observer(LogScreen);
