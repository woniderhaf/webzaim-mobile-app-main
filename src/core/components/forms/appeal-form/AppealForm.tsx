import React, { createElement, createRef, FunctionComponentElement, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FlatList, Text, View } from 'react-native';
import { Button, ControlProps, Dropdown, Input } from '../../../ui';
import { AppealFormFieldType } from '../../../enums';
import { useHistoryStore, useUserStore } from '../../../../store';
import { dateFormat, requiredValidator } from '../../../utils';
import useForm from '../../../hooks/useForm';
import { IAppealForm, IAppealFormField, IAppealFormGroup } from '../../../interfaces';
import { IFormData } from '../../..';
import FileUploader from '../../file-uplouder';
import locale from './locale';
import styles from './styles';

type FormValues = Record<string, any>;

type AppealFormProps = {
    data: IAppealForm,
    disabled?: boolean,
    onSubmit: (values: FormValues) => any;
};

type IData = {
    name: string,
    value: any
};

// типы полей:
// 'text' - однострочное текстовое поле (тип значения - string)
// 'textarea' - многострочное текстовое поле (тип значения - string)
// 'loanSelect' - выбор договора займа (тип значения - number)
// 'bankAccountNumber' - поле ввода номера банковского счета (тип значения - string)
// 'passportMainPage' - поле для загрузки скана паспорта с фото (тип значения - string)
// 'passportRegistrationPage' - поле для загрузки скана паспорта с пропиской (тип значения - string)
// 'passportSelfie' - поле для загрузки селфи с паспортом (тип значения - string)
// 'files' - поле для загрузки произвольных файлов (тип значения - string[] - массив айдишек)
// 'email' - поле ввода email (тип значения - string)
// 'userEmail' - поле ввода email, которое по умолчанию заполнится адресом текущего пользователя (тип значения - string)
// 'refundMethodSelect' - ВИДЖЕТ выбора метода возврата - СБП или банк (описание ниже)
// 'bankBic' - ВИДЖЕТ для ввода БИК банка (описание ниже)

// Виджет 'refundMethodSelect' добавляет в запрос создания обращения следующие поля:
// "{name}_method": "sbp" | "bank" // выбранный метод
// "{name}_sbpBank": id // выбранный банк для СБП (если "method" == "sbp"), идентификатор из словаря (thesaurus) 'sbpBank'
// "{name}_accountOwnerPhone": string // номер телефона в формате +79xxxxxxxxx (если "method" == "sbp")
// "{name}_bankBic": string // БИК банка (если "method" == "bank")
// "{name}_bankName": string // наименование банка (если "method" == "bank")
// "{name}_bankCorrespondentAccount": string // корр. счет банка (если "method" == "bank")
// "{name}_accountOwnerName": string // ФИО владельца счета (если "method" == "bank")

// Виджет 'bankBic' добавляет в запрос создания обращения следующие поля:
// "{name}_bankBic": string // БИК банка
// "{name}_bankName": string // наименование банка
// "{name}_bankCorrespondentAccount": string // корр. счет банка

// {name} - это переданное имя поля (groups.fields.name), используется в качестве префикса

type FieldsComponentMap = {
    [key in AppealFormFieldType]: any;
};

const CONTROLS: FieldsComponentMap = {
    text: Input,
    textarea: Input,
    loanSelect: Dropdown,
    bankAccountNumber: Input,
    email: Input,
    userEmail: Input,
    bankBic: Input,
    passportMainPage: FileUploader,
    passportRegistrationPage: FileUploader,
    passportSelfie: FileUploader,
    files: FileUploader,
    refundMethodSelect: null
};

const BIC_WIDGET_FIELDS = [
    { name: 'bankBic', label: 'БИК банка' },
    { name: 'bankName', label: 'Наименование банка' },
    { name: 'bankCorrespondentAccount', label: 'Корр. счет банка' }
];

const appealFormContructor = (data: IAppealForm): IFormData => {
    const result: IFormData = {};

    data.groups.forEach((group) => {
        group.fields.forEach((field) => {
            if (field.type === AppealFormFieldType.BANK_BIC) {
                // @TODO BIC WIDGET
                BIC_WIDGET_FIELDS.forEach((widgetField) => {
                    const name = `${field.name}_${widgetField.name}`;

                    result[name] = {
                        name,
                        value: '',
                        validators: [requiredValidator()]
                    };

                    if (field.required) {
                        result[name].validators.push(requiredValidator());
                    }
                });
            } else {
                result[field.name] = {
                    name: field.name,
                    value: '',
                    validators: []
                };

                if (field.required) {
                    result[field.name].validators.push(requiredValidator());
                }
            }
        });

    });

    return result;
};

const AppealForm = (props: AppealFormProps) => {
    const { user } = useUserStore();
    const { fetchHistory, getHistory } = useHistoryStore();
    let flatListRef = createRef<FlatList>();

    useEffect(() => {
        if (!getHistory.length) {
            fetchHistory();
        }
    }, []);

    const onSubmit = ($data: IFormData) => {
        const values: FormValues = {};

        Object.values($data).forEach((field) => {
            values[field.name] = field.value?.id || field.value;
        });

        props.onSubmit(values);
    };

    const form = appealFormContructor(props.data);
    const [data, onChange, onSubmitForm, setError] = useForm(form, onSubmit);

    useEffect(() => {
        const index = Object.values(data).findIndex(({ error }) => error?.length);

        if (index >= 0 && flatListRef) {
            flatListRef && flatListRef?.current?.scrollToIndex({
                index,
                animated: true
            });
        }

    }, [data]);

    const renderFormGroups = (groups: Array<IAppealFormGroup>) => {
        return groups.map((group, index) => (
            <View key={group.title + index}>
                {/* <Text style={styles.formGroupTitle} >{group.title}</Text> */}
                {group.fields.map((field) => {
                    // BIC BANK WIDGER
                    if (field.type === AppealFormFieldType.BANK_BIC) {
                        return BIC_WIDGET_FIELDS
                            .map(
                                (wigetField) => createControl(
                                    {
                                        ...field,
                                        name: `${field.name}_${wigetField.name}`,
                                        label: wigetField.label
                                    },
                                    group.title
                                )
                            );
                    }

                    return createControl(field, group.title);
                })}
            </View>
        ));
    };

    const createControl = (field: IAppealFormField, title?: string): FunctionComponentElement<any> | null => {
        if (!data[field.name]) {
            return null;
        }

        const $props: ControlProps = {
            label: field.label || title || '',
            value: data[field.name].value || '',
            error: data[field.name].error || ''
        };

        switch (field.type) {
        case AppealFormFieldType.LOAN_SELECT:
            $props.data = [...getHistory].map(item => ({
                id: item.documentNumber,
                title: `№ ${item.documentNumber} от ${item.documentDate ? dateFormat(item.documentDate) : ''}`
            }));

            $props.onSelect = (value) => onChange(field.name, value);

            break;
        case AppealFormFieldType.PASSPORT_MAIN_PAGE:
        case AppealFormFieldType.PASSPORT_REGISTRATION_PAGE:
        case AppealFormFieldType.PASSPORT_SELFIE:
        case AppealFormFieldType.FIELS:
            $props.value = field.type;
            $props.onPress = () => {  };
            break;
        case AppealFormFieldType.TEXT:
        case AppealFormFieldType.EMAIL:
        case AppealFormFieldType.USER_EMAIL:
        default:
            $props.onChange = (value) => onChange(field.name, value);
        }

        return (
            <View key={field.name + field.type} style={{ paddingVertical: 8 }}>
                {createElement(CONTROLS[field.type], $props)}
            </View>
        );
    };

    return (
        <>
            <View>
                <Text style={styles.formTitle}>{props.data.title}</Text>
                {Boolean(props.data.description) && (
                    <Text style={styles.formDescription}>{props.data.description}</Text>
                )}
                <View style={styles.formBody}>
                    {renderFormGroups(props.data.groups)}
                </View>
            </View>
            <View>
                <Button
                    value="Подать обращение"
                    onClick={onSubmitForm}
                />
            </View>
        </>
    );
};

export default observer(AppealForm);
