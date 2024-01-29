import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import styles from './styles';

type IProps = {
    html: string;
};

const HtmlView = ({ html }: IProps) => {
    const { width } = useWindowDimensions();

    return (
        <RenderHtml
            contentWidth={width - 32}
            source={{ html }}
            tagsStyles={styles}
        />
    );
};

export default HtmlView;
