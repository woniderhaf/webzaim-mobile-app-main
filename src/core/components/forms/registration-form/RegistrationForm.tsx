import React, { createElement, FunctionComponent, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Input, SecurityInput, DateInput, InputSuggestions } from '../../../ui';
import {
    requiredValidator,
    emailValidator,
    phoneValidator,
    PHONE_MASK,
    dateToUTC,
    textReplacerRU,
    apiDateToDate,
    emailReplacer,
    passwordReplacer,
    passwordValidator
} from '../../../utils';
import { DadataFIOTypes, REG_FORM } from '../../../enums';
import useForm from '../../../hooks/useForm';
import { IFormData, RegistrationData } from '../../../index';
import { IOption } from '../../../types';
import { postEmail, postFIO } from '../../../api';
import { useUserStore, useAuthStore } from '../../../../store';
import locale from './locale';

type RegistrationFormProps = {
    errors: Array<{ key: keyof RegistrationData; message: string }>;
    onSubmit: (data: RegistrationData) => any;
};

const RegistrationForm = (props: RegistrationFormProps) => {
    const { user, userExternal } = useUserStore();
    const { userPassword } = useAuthStore();

    const fetchSuggest = async (key: string, query: string): Promise<Array<IOption>> => {
        let res: IOption[] | PromiseLike<IOption[]> = [];

        try {
            const { data } =
                key === REG_FORM.EMAIL
                    ? await postEmail({ query })
                    : await postFIO({
                          query,
                          parts: [key.toUpperCase() as DadataFIOTypes]
                      });

            if (data?.suggestions) {
                // @ts-ignore
                res = data.suggestions.map(item => {
                    return {
                        title: item.value,
                        value: item.value
                    };
                }) as Array<IOption>;
            }
        } catch (e) {
            // ignore
        }

        return res;
    };

    const form = useMemo<IFormData>(
        () => ({
            [REG_FORM.PHONE]: {
                component: Input,
                name: REG_FORM.PHONE,
                value: (userExternal?.phoneNumber || user?.phoneNumber)?.trim().replace(/[()\s]/g, '') || '',
                validators: [requiredValidator(), phoneValidator()],
                controlProps: {
                    disabled: userExternal && !userExternal.canEditPhoneNumber,
                    trim: true,
                    masked: true,
                    type: 'phone-pad',
                    mask: PHONE_MASK,
                    format: (value: string) => value.trim().replace(/[()\s]/g, '')
                }
            },
            [REG_FORM.SURNAME]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_FORM.SURNAME,
                value: userExternal?.surname || user?.surname || '',
                validators: [requiredValidator()],
                controlProps: {
                    disabled: userExternal && !userExternal.canEditName,
                    format: textReplacerRU,
                    onChangeQuery: (query: string) => onChange(REG_FORM.SURNAME, query),
                    onSelect: (item: any) => onChange(REG_FORM.SURNAME, item.value),
                    fetchData: (query: string) => fetchSuggest(REG_FORM.SURNAME, query)
                }
            },
            [REG_FORM.NAME]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_FORM.NAME,
                value: userExternal?.name || user?.name || '',
                validators: [requiredValidator()],
                controlProps: {
                    disabled: userExternal && !userExternal.canEditName,
                    format: textReplacerRU,
                    onChangeQuery: (query: string) => onChange(REG_FORM.NAME, query),
                    onSelect: (item: any) => onChange(REG_FORM.NAME, item.value),
                    fetchData: (query: string) => fetchSuggest(REG_FORM.NAME, query)
                }
            },
            [REG_FORM.PATRONYMIC]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_FORM.PATRONYMIC,
                value: userExternal?.patronymic || user?.patronymic || '',
                validators: [requiredValidator()],
                controlProps: {
                    disabled: userExternal && !userExternal.canEditName,
                    format: textReplacerRU,
                    onChangeQuery: (query: string) => onChange(REG_FORM.PATRONYMIC, query),
                    onSelect: (item: any) => onChange(REG_FORM.PATRONYMIC, item.value),
                    fetchData: (query: string) => fetchSuggest(REG_FORM.PATRONYMIC, query)
                }
            },
            [REG_FORM.BIRTHDATE]: {
                component: DateInput,
                name: REG_FORM.BIRTHDATE,
                value:
                    (userExternal?.birthDate && apiDateToDate(userExternal.birthDate)) ||
                    (user?.birthDate && apiDateToDate(user.birthDate)) ||
                    '',
                validators: [requiredValidator()],
                controlProps: { disabled: userExternal && !userExternal.canEditBirthDate }
            },
            [REG_FORM.EMAIL]: {
                component: InputSuggestions as FunctionComponent,
                name: REG_FORM.EMAIL,
                value: userExternal?.email || user?.email || '',
                validators: [requiredValidator(), emailValidator()],
                controlProps: {
                    format: emailReplacer,
                    onChangeQuery: (query: string) => onChange(REG_FORM.EMAIL, query),
                    onSelect: (item: any) => onChange(REG_FORM.EMAIL, item.value),
                    fetchData: (query: string) => fetchSuggest(REG_FORM.EMAIL, query)
                }
            },
            [REG_FORM.PASSWORD]: {
                component: SecurityInput,
                name: REG_FORM.PASSWORD,
                value: userPassword || '',
                validators: [requiredValidator(), passwordValidator()],
                controlProps: {
                    format: passwordReplacer,
                    maxLength: 64,
                    isHidePassword: false
                }
            }
        }),
        []
    );

    const onSubmit = ($data: IFormData) => {
        const params = {} as RegistrationData;

        Object.keys($data).forEach(key => {
            // @ts-ignore
            params[key] = key === REG_FORM.BIRTHDATE ? dateToUTC($data[key].value) : $data[key].value;
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
        return Object.keys(form).map(key => {
            return (
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
            );
        });
    }, [data]);

    return (
        <View>
            {renderControls}
            <View style={{ marginTop: 16 }}>
                <Button value={'Продолжить'} onClick={onSubmitForm} />
            </View>
        </View>
    );
};

export default observer(RegistrationForm);
