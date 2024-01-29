import React, { useMemo } from 'react';
import { Image, ImageResizeMode, useWindowDimensions } from 'react-native';
import styles from './styles';

type IProps = {
    url: string;
    height: number;
    width: number;
    resize?: ImageResizeMode;
};

const PostImage = (props: IProps) => {
    const { width: screenWidth } = useWindowDimensions();

    const height = useMemo(() => {
        return props.height > props.width
            ? screenWidth
            : styles.image.height;
    }, [props.width, props.height]);

    return (
        <Image
            source={{ uri: props.url }}
            resizeMode={props.resize ?? 'cover'}
            style={[styles.image, { height }]}
        />
    );
};

export default PostImage;
