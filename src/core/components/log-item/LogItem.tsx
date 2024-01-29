import React, { useState } from 'react';
import { Text, TextStyle, Pressable, View } from 'react-native';
import format from 'date-fns/format';
import Clipboard from '@react-native-clipboard/clipboard';
import { Apilog } from '../../api/types';
import { Button } from '../../ui';
import { ConsoleLog } from '../index';
import styles from './styles';

interface ILogItem {
    item: Apilog;
    index: number;
}

type StatusRequest = 'error' | 'success' | 'warning';

const getStatusRequest = (status: number): StatusRequest => {
    switch (true) {
        case status === 200:
            return 'success';
        case status > 200 && status < 500:
            return 'warning';
        default:
            return 'error';
    }
};
const getFontStyleByRequestStatus = (status: StatusRequest): TextStyle => {
    switch (status) {
        case 'success':
            return styles.success;
        case 'warning':
            return styles.warning;
        case 'error':
            return styles.error;
    }
};

const LogItem = (props: ILogItem) => {
    const { item, index } = props;
    const [isCollapse, setIsCollapse] = useState(true);
    const [isRequest, setIsRequest] = useState(false);
    const [isShow, setIsShow] = useState(false);

    let status: StatusRequest = getStatusRequest(item.response.status);
    const fontStyleByRequestStatus = getFontStyleByRequestStatus(status);

    const onCopyRequest = () => {
        Clipboard.setString(JSON.stringify(item));
    };
    const changeTab = (flag: boolean) => {
        setIsRequest(flag);
    };

    const onPressAccordion = () => {
        setIsCollapse(!isCollapse);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.topContainer} onPress={onPressAccordion}>
                <View>
                    <Text style={styles.dateFont}>{format(item.time, 'dd.MM.yy HH:mm:ss')}</Text>
                    <Text>
                        {`${item.method} `}
                        <Text style={fontStyleByRequestStatus}>{item.response.status}</Text>
                    </Text>
                    <Text style={styles.pathRequestFont}>{item.url}</Text>
                </View>
                <View>
                    <Button
                        value="Скопировать"
                        info
                        style={{ height: 36, paddingHorizontal: 16 }}
                        onClick={onCopyRequest}
                    />
                </View>
            </Pressable>
            {!isCollapse && (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: '#2B56B9',
                            alignItems: 'stretch',
                            flexWrap: 'nowrap'
                        }}
                    >
                        <View style={{ width: '50%' }}>
                            <Button
                                value="Ответ"
                                transparent={isRequest}
                                style={{ height: 40, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                                onClick={() => changeTab(false)}
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Button
                                value="Запрос"
                                transparent={!isRequest}
                                style={{ height: 40, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                                onClick={() => changeTab(true)}
                            />
                        </View>
                    </View>
                    <View>
                        <ConsoleLog data={isRequest ? item.request : item.response} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default LogItem;
