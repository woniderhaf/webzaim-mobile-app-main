import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const ConsoleLog = ({ data }: { data: any }) => {

    const renderLine = (key: string, value: any) => (
        <View key={key} style={styles.line}>
            <View style={styles.labelContainer}>
                <Text selectable style={styles.label}>{key}: </Text>
            </View>
            <View style={styles.valueContainer}>
                <Text selectable style={styles.value}>{JSON.stringify(value)}</Text>
            </View>
        </View>
    );

    const renderData = ($data: { [x: string]: any; }) => {
        const content: JSX.Element[] = [];

        Object.keys($data).forEach((key) => {
            let value = $data[key];

            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                let obj = renderData(value);

                content.push(
                    <View key={key}>
                        <View style={{ paddingVertical: 0 }}>
                            <Text selectable>{`${key}: {`}</Text>
                        </View>
                        <View style={{ paddingLeft: 20 }}>
                            {obj}
                        </View>
                        <View style={{ paddingVertical: 0 }}>
                            <Text selectable>{'} '}</Text>
                        </View>
                    </View>
                );
            } else if (Array.isArray(value)) {
                if (value.length > 0 && key !== 'set-cookie') {
                    content.push(
                        <View key={key}>
                            <View style={{ paddingVertical: 0 }}>
                                <Text selectable>{`${key}: [`}</Text>
                            </View>
                            <View style={{ paddingLeft: 20 }}>
                                {value
                                    .map((item, index) => {
                                        return (
                                            <View key={JSON.stringify(item)}>
                                                <View style={{ paddingVertical: 0 }}>
                                                    <Text selectable>{`${index}: `}</Text>
                                                </View>
                                                <View style={{ paddingLeft: 20 }}>
                                                    {renderData(item)}
                                                </View>
                                            </View>
                                        );
                                    })}
                            </View>
                            <View style={{ paddingVertical: 0 }}>
                                <Text selectable>{'] '}</Text>
                            </View>
                        </View>
                    );
                } else {
                    content.push(
                        renderLine(key, value)
                    );
                }

            } else {
                content.push(
                    renderLine(key, value)
                );
            }
        });

        return content;
    };

    return (
        <View style={{ paddingVertical: 8 }}>
            {renderData(data)}
        </View>
    );
};

export default ConsoleLog;
