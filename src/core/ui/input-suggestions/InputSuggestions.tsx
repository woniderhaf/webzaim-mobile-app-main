import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, ActivityIndicator, KeyboardTypeOptions } from 'react-native';
import { IOption } from '../../types';
import Input from '../input';
import styles from './styles';

interface InputSuggestionsProps {
    label: string;
    value: string;
    onChangeQuery?: (value: string) => void;
    onBlur?: () => void;
    fetchData: (query: string) => Promise<Array<IOption>>;
    onSelect: (item: IOption) => void;
    disabled?: boolean;
    error?: string;
    format?: (value: string) => any;
    mask?: Array<RegExp | string>;
    masked?: boolean;
    type?: KeyboardTypeOptions;
}

const FETCH_TIMEOUT = 500;
let fetchRequestTimeout: NodeJS.Timeout | null | undefined = null;

const InputSuggestions = (props: InputSuggestionsProps) => {
    const {
        label,
        onSelect,
        fetchData,
        value = '',
        disabled,
        error,
        onChangeQuery,
        onBlur,
        format,
        masked,
        mask,
        type
    } = props;
    const InputWrapper = useRef<TouchableOpacity>(null);
    const [query, setQuery] = useState(value);
    const [data, setData] = useState<Array<IOption>>([]);
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (value !== query) {
            setQuery(value);
        }
    }, [value]);

    const onItemPress = (item: IOption): void => {
        /**
         * @description Фикс бага
         * При введении полностью текста вручную и выбора из предложеного списка нужного значения результат будет ""
         * Баг обнаружен при вводе кода подразделения паспорта.
         */
        // setQuery(item.title);
        onSelect(item);
        setFocus(false);
        setData([]);
        InputWrapper.current?.blur();
    };

    const onBlurHandler = () => {
        setFocus(false);
        setData([]);

        if (onBlur) {
            onBlur();
        }
    };

    const onChange = (text: string) => {
        setQuery(text);

        if (onChangeQuery) {
            onChangeQuery(text);
        }

        if (fetchRequestTimeout) {
            clearTimeout(fetchRequestTimeout);
        }

        fetchRequestTimeout = setTimeout(async () => {
            setLoading(true);

            try {
                const response = await fetchData(text);

                setData(response);
            } finally {
                setLoading(false);
            }
        }, FETCH_TIMEOUT);
    };

    const renderLoader = () => <ActivityIndicator size={'small'} />;

    const renderItem = (item: IOption, index: number) => (
        <TouchableOpacity
            key={String(index + item.title)}
            style={[styles.item, query === item.title && styles.itemSelected]}
            onPress={() => onItemPress(item)}
        >
            <Text style={styles.label}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = useMemo(() => {
        if (!query || !focus || !data.length) {
            return null;
        }

        return (
            <View style={styles.dropdown}>
                <ScrollView keyboardShouldPersistTaps={'always'}>{data.map(renderItem)}</ScrollView>
            </View>
        );
    }, [data, query, focus]);

    return (
        <View style={styles.buttonText}>
            <Input
                mask={mask}
                masked={masked}
                ref={InputWrapper}
                value={query}
                label={label}
                onFocus={() => setFocus(true)}
                onBlur={onBlurHandler}
                error={error}
                disabled={disabled}
                onChange={onChange}
                postfix={loading ? renderLoader() : null}
                format={format}
                type={type}
            />
            {renderDropdown}
        </View>
    );
};

export default InputSuggestions;
