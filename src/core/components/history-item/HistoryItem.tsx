import React from 'react';
import { Text, View } from 'react-native';
import { HIstoryItemStatusTypes } from '../../enums';
import { IHistoryItem } from '../../interfaces';
import { BoxShadow } from '../../ui';
import { dateFormat } from '../../utils';
import LenderLogo from '../lender-logo';
import styles from './styles';

type HistoryItemProps = {
    data: IHistoryItem
};

const locales = {
    subtitle: {
        [HIstoryItemStatusTypes.WAITING_USER_CONFIRMATION]: 'Ожидает СМС-подтверждения',
        [HIstoryItemStatusTypes.PENDING_APPROVAL]: 'Ожидает одобрения',
        [HIstoryItemStatusTypes.APPROVED]: 'Активен',
        [HIstoryItemStatusTypes.CANCELLED]: 'Отменен',
        [HIstoryItemStatusTypes.REJECTED]: 'Не одобрен',
        [HIstoryItemStatusTypes.REPAID]: 'Погашен'
    }
};

const HistoryItem = ({ data }: HistoryItemProps) => {
    const title = `Займ № ${data.documentNumber} от ${dateFormat(data.documentDate)}`;
    const subtitle = locales.subtitle[data.status] || 'Статус займа неизвестен';

    return (
        <BoxShadow paddingHorizontal={12} paddingVertical={20}>
            <View>
                <LenderLogo lender={data.lender} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>{title}</Text>
                <Text style={[styles.subtitle, styles[data.status]]}>{subtitle}</Text>
            </View>
        </BoxShadow>
    );
};

export default HistoryItem;
