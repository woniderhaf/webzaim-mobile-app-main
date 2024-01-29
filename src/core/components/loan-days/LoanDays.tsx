
import React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { CircleProgress, Icon } from '../../ui';
import { daysFormat } from '../../utils';
import styles from './styles';

type LoanDaysProps = {
    count: number;
    warning?: boolean;
};

const MAX_DAYS = 30;

const LoanDays = ({ count, warning }: LoanDaysProps) => {
    const isFail = count < 0;
    const precent = warning || isFail ? 100 : ((MAX_DAYS - count) * 100) / MAX_DAYS;
    const baseColor = '#f6f6f6';

    let activeColor = '#00E5B9';
    let description = 'осталось до погашения';

    if (warning) {
        activeColor = '#FFA05B';
        description = 'до подачи заявки';
    } else if (isFail) {
        activeColor = '#E13A3A';
        description = 'просрочено';
    }

    return (
        <View style={styles.container}>
            <View style={styles.progress}>
                <CircleProgress
                    activeColor={activeColor}
                    passiveColor={baseColor}
                    baseColor={baseColor}
                    width={5}
                    done={Math.round(precent)}
                    radius={26}
                    duration={800}>
                    <Icon name={isFail ? 'warning' : 'clockGray'} size={24} />
                </CircleProgress>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{daysFormat(Math.abs(count))}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

export default observer(LoanDays);
