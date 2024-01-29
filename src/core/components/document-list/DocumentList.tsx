import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../ui';
import styles from './styles';

type IDocLink = {
    title: string,
    onPress: () => any
};

type IProps = {
    data: Array<IDocLink>
};

const DocumentListItem = ({ onPress, title }: IDocLink) => {
    return (
        <TouchableOpacity
            key={title}
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.itemContainer}
        >
            <View style={styles.button}>
                <View style={styles.buttonIcon}>
                    <Icon name="documentCircle" size={34} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Icon name="angleRight" size={24} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const DocumentList = ({ data }: IProps) => {
    return (
        <View>
            {data.map(DocumentListItem)}
        </View>
    );
};

DocumentList.Item = DocumentListItem;
export default DocumentList;
