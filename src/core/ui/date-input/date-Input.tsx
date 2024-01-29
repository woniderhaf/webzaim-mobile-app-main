import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import format from 'date-fns/format';
import DatePicker from 'react-native-date-picker';
import Input, { InputProps } from '../input/Input';
import styles from './styles';

type DateInputProps = InputProps & {
    dateFormat?: string;
    onChange: (date: Date) => any;
};

const DateInput = React.forwardRef((props: DateInputProps, ref) => {
    const { value, label, dateFormat = 'dd.MM.yyyy', error, disabled } = props;
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    const inputValue = value ? format(value, dateFormat) : '';
    const defaultDatepickerValue = value ? value : new Date();

    const onChangeBirthDate = (date: Date) => {
        setDatePickerOpened(false);
        props.onChange(date);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setDatePickerOpened(true)}>
                <View>
                    <Input
                        ref={ref}
                        label={label}
                        value={inputValue}
                        error={error}
                        onChange={() => {}}
                        onPress={() => setDatePickerOpened(true)}
                        style={[styles.input, disabled && styles.inputDisabledColor]}
                        disabled
                    />
                </View>
            </TouchableOpacity>
            <DatePicker
                date={defaultDatepickerValue}
                title={label}
                locale="ru"
                open={!disabled && datePickerOpened}
                modal
                mode="date"
                onConfirm={onChangeBirthDate}
                onCancel={() => setDatePickerOpened(false)}
                confirmText={'Ок'}
                cancelText={'Отмена'}
            />
        </View>
    );
});

export default DateInput;
