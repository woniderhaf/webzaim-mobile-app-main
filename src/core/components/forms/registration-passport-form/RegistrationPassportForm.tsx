import React, { createElement, FunctionComponent, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Input, DateInput, InputSuggestions } from '../../../ui';
import {
    requiredValidator,
    dateToUTC,
    PASSPORT_NUMBER,
    PASSPORT_SUBUNIT_CODE,
    apiDateToDate,
    birthPlaceReplacer,
    passportIssueDateValidator,
    passportValidator,
    textReplacerRUWithSymbols
} from '../../../utils';
import { REG_PASSPORT_FORM } from '../../../enums';
import useForm from '../../../hooks/useForm';
import { IFormData, RegistrationData } from '../../../index';
import { IOption } from '../../../types';
import { postFMS } from '../../../api';
import { IUserProfile } from '../../../interfaces';
import locale from './locale';

type RegistrationPassportFormProps = {
    errors: Array<{ key: keyof RegistrationData; message: string }>;
    onSubmit: (data: any) => any;
    user?: IUserProfile;
    regForm?: RegistrationData;
    disabled?: boolean;
};

const RegistrationPassportForm = (props: RegistrationPassportFormProps) => {
    const { passport, birthDate } = props?.user || {};
    const { birthDate: birthDateReg } = props?.regForm || {};
    const defaultPassportNumber = passport?.number && passport?.series ? `${passport.series} ${passport.number}` : '';

    const fetchSuggest = async (key: string, query: string): Promise<Array<IOption>> => {
        let res: IOption[] | PromiseLike<IOption[]> = [];

        try {
            const { data } = await postFMS({ query });

            if (data?.suggestions) {
                // @ts-ignore
                res = data.suggestions.map(item => ({
                    title: item.value,
                    value: item.data
                })) as Array<IOption>;
            }
        } catch (e) {
            // ignore
        }

        return res;
    };

    const onSelectSubunit = (item: any) => {
        onChange(REG_PASSPORT_FORM.SUBUNIT_CODE, item.value.code);
        onChange(REG_PASSPORT_FORM.ISSUER, item.value.name);
    };

    const form = useMemo<IFormData>(
        () => ({
            [REG_PASSPORT_FORM.NUMBER]: {
                component: Input,
                name: REG_PASSPORT_FORM.NUMBER,
                value: defaultPassportNumber,
                validators: [requiredValidator(), passportValidator()],
                controlProps: {
                    trim: true,
                    masked: true,
                    type: 'phone-pad',
                    mask: PASSPORT_NUMBER
                }
            },
            [REG_PASSPORT_FORM.ISSUE_DATE]: {
                component: DateInput,
                name: REG_PASSPORT_FORM.ISSUE_DATE,
                value: (passport?.issueDate && apiDateToDate(passport?.issueDate)) || '',
                validators: [requiredValidator(), passportIssueDateValidator(birthDateReg || birthDate)]
            },
            [REG_PASSPORT_FORM.SUBUNIT_CODE]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_PASSPORT_FORM.SUBUNIT_CODE,
                value: passport?.subunitCode || '',
                validators: [requiredValidator()],
                controlProps: {
                    trim: true,
                    masked: true,
                    type: 'phone-pad',
                    mask: PASSPORT_SUBUNIT_CODE,
                    onChangeQuery: (query: string) => onChange(REG_PASSPORT_FORM.SUBUNIT_CODE, query),
                    onSelect: onSelectSubunit,
                    fetchData: (query: string) => fetchSuggest(REG_PASSPORT_FORM.SUBUNIT_CODE, query)
                }
            },
            [REG_PASSPORT_FORM.ISSUER]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_PASSPORT_FORM.ISSUER,
                value: passport?.issuer || '',
                validators: [requiredValidator()],
                controlProps: {
                    format: textReplacerRUWithSymbols,
                    onChangeQuery: (query: string) => onChange(REG_PASSPORT_FORM.ISSUER, query),
                    onSelect: onSelectSubunit,
                    fetchData: (query: string) => fetchSuggest(REG_PASSPORT_FORM.ISSUER, query)
                }
            },
            [REG_PASSPORT_FORM.BIRTH_PLACE]: {
                component: Input,
                name: REG_PASSPORT_FORM.BIRTH_PLACE,
                value: passport?.birthPlace || '',
                validators: [requiredValidator()],
                controlProps: {
                    format: birthPlaceReplacer
                }
            }
        }),
        []
    );

    const onSubmit = ($data: IFormData) => {
        const params = {} as RegistrationData;

        Object.keys($data).forEach(key => {
            // @ts-ignore
            params[key] = key === REG_PASSPORT_FORM.ISSUE_DATE ? dateToUTC($data[key].value) : $data[key].value;
        });

        props.onSubmit(params);
    };

    const [data, onChange, onSubmitForm, setError] = useForm(form, onSubmit);

    useEffect(() => {
        if (props.errors.length) {
            props.errors.forEach(error => {
                setError(error.key, error.message);
            });
        }
    }, [props.errors]);

    const renderControls = useMemo(() => {
        return Object.keys(form).map(key => (
            <View key={key} style={{ marginBottom: 8 }}>
                {createElement(form[key].component as React.FC, {
                    ...(form[key].controlProps || {}),
                    ...data[key],
                    // @ts-ignore
                    ...locale.form[key],
                    onChange: (value: string) => {
                        onChange(key, value);
                    }
                })}
            </View>
        ));
    }, [data]);

    return (
        <View>
            {renderControls}
            <View style={{ marginTop: 16 }}>
                <Button value={'Продолжить'} disabled={props.disabled} onClick={onSubmitForm} />
            </View>
        </View>
    );
};

export default observer(RegistrationPassportForm);
