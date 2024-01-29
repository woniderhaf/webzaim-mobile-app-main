import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Dropdown, Input } from '../../../ui';
import { PHONE_MASK, phoneValidator, requiredValidator } from '../../../utils';
import { PROFILE_FORM, ThesaurusTypes } from '../../../enums';
import useForm from '../../../hooks/useForm';
import { RegistrationData } from '../../../index';
import { IUserProfile } from '../../../interfaces';
import { useDictionaryStore } from '../../../../store';
import locale from './locale';
import styles from './styles';

type RegistrationAdditionalDataFormProps = {
    errors: Array<{ key: keyof RegistrationData; message: string }>;
    onSubmit: (data: any) => any;
};

const RegistrationAdditionalDataForm = (props: RegistrationAdditionalDataFormProps) => {
    const dictionaryStore = useDictionaryStore();

    const form = {
        [PROFILE_FORM.ADDITIONAL_PHONE]: {
            name: PROFILE_FORM.ADDITIONAL_PHONE,
            value: '',
            validators: []
        },
        [PROFILE_FORM.EDUCATION]: {
            name: PROFILE_FORM.EDUCATION,
            value: '',
            validators: [requiredValidator()]
        },
        [PROFILE_FORM.INCOME]: {
            name: PROFILE_FORM.INCOME,
            value: '',
            validators: [requiredValidator()]
        },
        [PROFILE_FORM.MATERIAL_STATUS]: {
            name: PROFILE_FORM.MATERIAL_STATUS,
            value: '',
            validators: [requiredValidator()]
        }
    };

    const onSubmit = () => {
        const params: Partial<IUserProfile> = {
            additionalPhoneNumber: data[PROFILE_FORM.ADDITIONAL_PHONE].value,
            education: data[PROFILE_FORM.EDUCATION].value,
            income: data[PROFILE_FORM.INCOME].value,
            maritalStatus: data[PROFILE_FORM.MATERIAL_STATUS].value
        };

        props.onSubmit(params);
    };

    useEffect(() => {
        if (props.errors.length) {
            props.errors.forEach((error) => {
                setError(error.key, error.message);
            });
        }
    }, [props.errors]);

    const [data, onChange, onSubmitForm, setError, setValidators] = useForm(form, onSubmit);

    useEffect(() => {
        if (data[PROFILE_FORM.ADDITIONAL_PHONE].value) {
            setValidators(PROFILE_FORM.ADDITIONAL_PHONE, [phoneValidator]);
        } else {
            setValidators(PROFILE_FORM.ADDITIONAL_PHONE, []);
        }
    }, [data[PROFILE_FORM.ADDITIONAL_PHONE].value]);

    return (
        <View>
            <View style={styles.groupBody}>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.MATERIAL_STATUS]}
                        defaultValue={data[PROFILE_FORM.MATERIAL_STATUS].value}
                        error={data[PROFILE_FORM.MATERIAL_STATUS].error}
                        data={dictionaryStore.getOptions(ThesaurusTypes.MATERIAL_STATUS)}
                        onSelect={({ id }) => onChange(PROFILE_FORM.MATERIAL_STATUS, id)}
                    />
                </View>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.EDUCATION]}
                        defaultValue={data[PROFILE_FORM.EDUCATION].value}
                        error={data[PROFILE_FORM.EDUCATION].error}
                        data={dictionaryStore.getOptions(ThesaurusTypes.EDUCATION)}
                        onSelect={({ id }) => onChange(PROFILE_FORM.EDUCATION, id)}
                    />
                </View>
                <View style={styles.mb20}>
                    <Input
                        key={PROFILE_FORM.ADDITIONAL_PHONE}
                        label={locale[PROFILE_FORM.ADDITIONAL_PHONE]}
                        value={data[PROFILE_FORM.ADDITIONAL_PHONE].value}
                        error={data[PROFILE_FORM.ADDITIONAL_PHONE].error}
                        mask={PHONE_MASK}
                        hint={locale.additionalPhoneNumberHint}
                        onChange={(value) => onChange(PROFILE_FORM.ADDITIONAL_PHONE, value)}
                    />
                </View>
                <View style={styles.groupHead}>
                    <Text style={styles.groupTitle}>{locale.incomeTitle}</Text>
                </View>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.INCOME]}
                        defaultValue={data[PROFILE_FORM.INCOME].value}
                        error={data[PROFILE_FORM.INCOME].error}
                        data={dictionaryStore.getOptions(ThesaurusTypes.INCOME)}
                        hint={locale.incomeHint}
                        onSelect={({ id }) => onChange(PROFILE_FORM.INCOME, id)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button value={locale.submit} onClick={onSubmitForm} />
            </View>
        </View>
    );
};

export default observer(RegistrationAdditionalDataForm);
