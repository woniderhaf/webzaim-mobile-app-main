import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Checkbox } from '../../../ui';
import { addressValidator, createUserAddress } from '../../../utils';
import { PROFILE_FORM } from '../../../enums';
import useForm from '../../../hooks/useForm';
import { RegistrationData } from '../../../index';
import AddressForm from '../address-form';
import { IUserProfile } from '../../../interfaces';
import { useDictionaryStore } from '../../../../store';
import locale from './locale';
import styles from './styles';

type RegistrationAddressFormProps = {
    errors: Array<{ key: keyof RegistrationData; message: string }>;
    onSubmit: (data: any) => any;
};

const RegistrationAddressForm = (props: RegistrationAddressFormProps) => {
    const dictionaryStore = useDictionaryStore();
    const [userAddressesIsEqual, setUserAddressesIsEqual] = useState(true);

    const form = {
        [PROFILE_FORM.ADDRESS_REGISTRATION]: {
            name: PROFILE_FORM.ADDRESS_REGISTRATION,
            value: dictionaryStore.addresses.registration,
            validators: [addressValidator()]
        },
        [PROFILE_FORM.ADDRESS_RESIDENTIAL]: {
            name: PROFILE_FORM.ADDRESS_RESIDENTIAL,
            value: dictionaryStore.addresses.residential,
            validators: userAddressesIsEqual ? [] : [addressValidator()]
        }
    };

    useEffect(() => {
        if (userAddressesIsEqual) {
            setValidators(PROFILE_FORM.ADDRESS_RESIDENTIAL, []);
        } else {
            setValidators(PROFILE_FORM.ADDRESS_RESIDENTIAL, [addressValidator()]);
        }
    }, [userAddressesIsEqual]);

    const onSubmit = () => {
        const params: Partial<IUserProfile> = {};

        const regAddress = createUserAddress(data[PROFILE_FORM.ADDRESS_REGISTRATION].value);

        params.registrationAddress = regAddress;

        params.residentialAddress = userAddressesIsEqual
            ? regAddress
            : createUserAddress(data[PROFILE_FORM.ADDRESS_RESIDENTIAL].value);

        props.onSubmit(params);
    };

    useEffect(() => {
        if (props.errors.length) {
            props.errors.forEach(error => {
                setError(error.key, error.message);
            });
        }
    }, [props.errors]);

    const [data, onChange, onSubmitForm, setError, setValidators] = useForm(form, onSubmit);

    return (
        <View>
            <View style={styles.groupBody}>
                <AddressForm
                    defaultValue={data[PROFILE_FORM.ADDRESS_REGISTRATION].value}
                    errors={data[PROFILE_FORM.ADDRESS_REGISTRATION].error}
                    onChange={value => onChange(PROFILE_FORM.ADDRESS_REGISTRATION, value)}
                />
            </View>
            <View style={styles.groupBody}>
                <View style={styles.mb20}>
                    <Checkbox
                        value={userAddressesIsEqual}
                        label={locale.userAddressesIsEqual}
                        onChange={value => {
                            setUserAddressesIsEqual(value);
                        }}
                    />
                </View>
            </View>
            {!userAddressesIsEqual && (
                <>
                    <View style={styles.groupHead}>
                        <Text style={styles.groupTitle}>{locale.addressResidential}</Text>
                    </View>
                    <View style={styles.groupBody}>
                        <AddressForm
                            defaultValue={data[PROFILE_FORM.ADDRESS_RESIDENTIAL].value}
                            errors={data[PROFILE_FORM.ADDRESS_RESIDENTIAL].error}
                            onChange={value => onChange(PROFILE_FORM.ADDRESS_RESIDENTIAL, value)}
                        />
                    </View>
                </>
            )}
            <View style={styles.buttonContainer}>
                <Button value={locale.submit} onClick={onSubmitForm} />
            </View>
        </View>
    );
};

export default observer(RegistrationAddressForm);
