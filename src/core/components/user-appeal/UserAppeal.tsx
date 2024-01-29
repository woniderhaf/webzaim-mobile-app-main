import React from 'react';
import { Text } from 'react-native';
import { UserAppealsStatus } from '../../enums';
import { IUserAppeal } from '../../interfaces';
import { ButtonLink, InfoText } from '../../ui';
import { dateFormat } from '../../utils';
import styles from './styles';

export interface IProps {
    appeal: IUserAppeal
}

const UserAppeal = ({ appeal }: IProps) => {
    const status = appeal.status === UserAppealsStatus.COMPLETED
        ? 'Готово'
        : 'На рассмотрении';

    return (
        <InfoText apperiance="info">
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.document}>
                {`№ ${appeal.documentNumber}`}
                {appeal.documentDate && ` от ${dateFormat(appeal.documentDate)}`}
            </Text>
            {appeal.fileHref && (
                <ButtonLink
                    text="Скачать документ"
                    style={styles.download}
                    onPress={() => {}}
                />
            )}
        </InfoText>
    );
};

export default UserAppeal;
