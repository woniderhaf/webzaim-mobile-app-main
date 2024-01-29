import React from 'react';
import { Text, View } from 'react-native';
import { dateFormat, dateToUTC } from '../../utils';
import styles from './styles';

type IProps = {
    value: string;
};

const PostDate = ({ value }: IProps) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.date}>
                {dateFormat(dateToUTC(value))}
            </Text>
        </View>
    );
};

export default PostDate;
