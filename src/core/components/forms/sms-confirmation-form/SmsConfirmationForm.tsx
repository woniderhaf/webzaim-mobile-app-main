import React from 'react';
import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { Button, ButtonLink, ButtonList, ErrorMessage, Icon, Input } from '../../../ui';
import { SmsConfirmationTypes } from '../../../enums';
import { requiredValidator, SIX_PIN_MASK, FOUR_PIN_MASK } from '../../../utils';
import useForm from '../../../hooks/useForm';
import locale from './locale';
import styles from './styles';

type SmsConfirmationFormProps = {
    type: SmsConfirmationTypes;
    phone: string;
    doubleCode: boolean;
    error?: string;
    disabled?: boolean;
    onSubmit: (value: string) => any;
    onCancel?: () => any;
    onDocumentPress?: () => any;
};

enum FORM_FIELDS {
    CODE = 'code'
}

const SmsConfirmationForm = (props: SmsConfirmationFormProps) => {
    const { phone, error, type, doubleCode, onCancel, onDocumentPress } = props;

    const isRequest = type === SmsConfirmationTypes.REQUEST;
    const isRegistration = type === SmsConfirmationTypes.REGISTRATION;
    const mask = doubleCode ? SIX_PIN_MASK : FOUR_PIN_MASK;

    const form = {
        [FORM_FIELDS.CODE]: {
            name: FORM_FIELDS.CODE,
            value: '',
            validators: [requiredValidator()]
        }
    };

    const onSubmit = ($data: any) => {
        props.onSubmit($data[FORM_FIELDS.CODE].value);
    };

    const [data, onChange, onSubmitForm] = useForm(form, onSubmit);

    const minLength = doubleCode ? 6 : 4;
    const disabled = data[FORM_FIELDS.CODE].value.replace(/[\s/]/g, '').length < minLength;

    return (
        <View>
            {onDocumentPress && (
                <ButtonList onPress={onDocumentPress} iconPosition={'center'}>
                    <View style={styles.button}>
                        <View style={styles.buttonIcon}>
                            <Icon name="documentCircle" size={34} />
                        </View>
                        <View>
                            <Text style={styles.buttonSubtitle} numberOfLines={1}>
                                {locale.document}
                            </Text>
                        </View>
                    </View>
                </ButtonList>
            )}
            <View style={styles.form}>
                {Boolean(error) && (
                    <View style={{ marginTop: 20 }}>
                        <ErrorMessage message={error || ''} />
                    </View>
                )}
                <Text style={[styles.formTitle, { marginTop: error ? 0 : 32 }]}>{locale.formTitle[type] || ''}</Text>
                <Text style={styles.formText}>
                    {locale.number} {phone}
                </Text>
                <Text style={styles.formText}>{doubleCode ? locale.lognCode : locale.shortCode}</Text>
                <Text style={styles.formText}>{locale.enterText}</Text>
                <View style={styles.formControl}>
                    <Input
                        value={data[FORM_FIELDS.CODE].value}
                        error={data[FORM_FIELDS.CODE].error}
                        label={locale.form.code}
                        onChange={(value) => onChange(FORM_FIELDS.CODE, value)}
                        digitOnly
                        mask={mask}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button value={locale.form.submit} disabled={disabled} onClick={onSubmitForm} />
                </View>
                {isRequest && onCancel && (
                    <View style={styles.shortcutContainer}>
                        <Text style={styles.formHint}>{locale.shortcut}</Text>
                        <ButtonLink text={locale.form.cancel} onPress={onCancel} />
                    </View>
                )}
                {isRegistration && onCancel && (
                    <View style={styles.shortcutContainer}>
                        <ButtonLink text={locale.form.changePhone} onPress={onCancel} />
                    </View>
                )}
            </View>
        </View>
    );
};

export default observer(SmsConfirmationForm);
