import React from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const img = require('../../../../assets/images/logo-full.png');

export interface IProps {
    title: string,
    description: string,
    date: string,
    onPress: (event: GestureResponderEvent) => void,
    image?: string
}

const ArticlePreview = ({ title, description, date, image, onPress }: IProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.preview}>
                <View style={styles.imageContainer}>
                    {image && (
                        <Image
                            source={img}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    )}
                </View>
                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{date}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ArticlePreview;
