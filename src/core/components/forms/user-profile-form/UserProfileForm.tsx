import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Text, View } from 'react-native';
import { formatWithMask } from 'react-native-mask-input';
import { useDictionaryStore } from '../../../../store';
import { IAddress, IUserAddress, IUserProfile } from '../../../interfaces';
import { ThesaurusTypes, PROFILE_FORM } from '../../../enums';
import { AddressErrors } from '../../../types';
import useForm from '../../../hooks/useForm';
import { addressValidator, dateFormat, PHONE_MASK } from '../../../utils';
import { Button, Checkbox, Dropdown, Input, ReadonlyField } from '../../../ui';
import AddressForm from '../address-form';
import locale from './locale';
import styles from './styles';

type UserProfileFormProps = {
    user: IUserProfile;
    disabled?: boolean;
    regAddressError?: AddressErrors | null;
    resAddressError?: AddressErrors | null;
    onSubmit: (data: Partial<IUserProfile>) => any;
};

const isAddressEqual = (firstAdr: IUserAddress, secondAdr: IUserAddress) => {
    return (
        firstAdr.cityKladrId === secondAdr.cityKladrId &&
        firstAdr.street === secondAdr.street &&
        firstAdr.house === secondAdr.house &&
        firstAdr.flat === secondAdr.flat
    );
};

const createUserAddress = (address: IAddress): IUserAddress => {
    const { region, city, ...userAddress } = address;

    return userAddress;
};

const UserProfileForm = (props: UserProfileFormProps) => {
    const { user, regAddressError, resAddressError } = props;
    const dictionaryStore = useDictionaryStore();
    const [userAddressesIsEqual, setUserAddressesIsEqual] = useState(
        isAddressEqual(user.registrationAddress, user.residentialAddress)
    );
    const isDisabled = !user?.canEditData || props.disabled;

    const form = {
        [PROFILE_FORM.ADDITIONAL_PHONE]: {
            name: PROFILE_FORM.ADDITIONAL_PHONE,
            value: user.additionalPhoneNumber || '',
            validators: []
        },
        [PROFILE_FORM.EDUCATION]: {
            name: PROFILE_FORM.ADDITIONAL_PHONE,
            value: user.education,
            validators: []
        },
        [PROFILE_FORM.INCOME]: {
            name: PROFILE_FORM.INCOME,
            value: user.income,
            validators: []
        },
        [PROFILE_FORM.MATERIAL_STATUS]: {
            name: PROFILE_FORM.MATERIAL_STATUS,
            value: user.maritalStatus,
            validators: []
        },
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
        const params: Partial<IUserProfile> = {
            additionalPhoneNumber: data[PROFILE_FORM.ADDITIONAL_PHONE].value,
            education: data[PROFILE_FORM.EDUCATION].value,
            income: data[PROFILE_FORM.INCOME].value,
            maritalStatus: data[PROFILE_FORM.MATERIAL_STATUS].value
        };

        const regAddress = createUserAddress(data[PROFILE_FORM.ADDRESS_REGISTRATION].value);

        params.registrationAddress = regAddress;

        params.residentialAddress = userAddressesIsEqual
            ? regAddress
            : createUserAddress(data[PROFILE_FORM.ADDRESS_RESIDENTIAL].value);

        props.onSubmit(params);
    };

    const [data, onChange, onSubmitForm, setError, setValidators, dirty, setDirty] = useForm(form, onSubmit);

    const renderTitle = (title: string) => {
        return (
            <View style={styles.groupHead}>
                <Text style={styles.groupTitle}>{title}</Text>
            </View>
        );
    };

    useEffect(() => {
        if (regAddressError) {
            setError(PROFILE_FORM.ADDRESS_REGISTRATION, regAddressError);
        }

        if (resAddressError) {
            setError(PROFILE_FORM.ADDRESS_RESIDENTIAL, resAddressError);
        }
    }, [regAddressError, resAddressError]);

    const renderReadOnlyFields = (fields: Array<keyof IUserProfile>) => {
        return fields.map(field => {
            // рендер паспорта пользователя
            if (user[field] && typeof user[field] === 'object') {
                // @ts-ignore
                return Object.keys(user[field]).map(key => {
                    if (key === 'number') {
                        return null;
                    }
                    // @ts-ignore
                    let value = user[field][key];

                    if (key === 'series') {
                        // @ts-ignore
                        value = `${user[field][key]} ${user[field].number}`;
                    } else if (key.includes('Date')) {
                        // @ts-ignore
                        value = dateFormat(user[field][key]);
                    }

                    return (
                        <View key={field + key} style={styles.mb20}>
                            <ReadonlyField
                                label={locale[field][key]}
                                // @ts-ignore
                                value={value}
                            />
                        </View>
                    );
                });
            }
            // рендер остальных полей
            let value = user[field];

            if (field.includes('Date')) {
                value = dateFormat(Number(value));
            } else if (field.includes('phone')) {
                value = formatWithMask({ text: String(value), mask: PHONE_MASK }).masked;
            }

            return (
                <View key={field} style={styles.mb20}>
                    <ReadonlyField
                        label={locale[field]}
                        // @ts-ignore
                        value={value}
                    />
                </View>
            );
        });
    };

    const renderInputs = (fields: Array<PROFILE_FORM>) => {
        return fields.map(field => {
            return (
                <Input
                    key={field}
                    label={locale[field]}
                    value={data[field].value}
                    error={data[field].error}
                    disabled={isDisabled}
                    mask={field === PROFILE_FORM.ADDITIONAL_PHONE ? PHONE_MASK : undefined}
                    onChange={value => onChange(field, value)}
                />
            );
        });
    };

    return (
        <View>
            {renderTitle('Личные данные')}
            <View style={styles.groupBody}>
                {renderReadOnlyFields(['surname', 'name', 'patronymic', 'birthDate', 'phoneNumber'])}
                {renderInputs([PROFILE_FORM.ADDITIONAL_PHONE])}
                <Input label={locale.email} value={user.email || ''} disabled onChange={() => {}} />
            </View>
            {renderTitle('Паспортные данные')}
            <View style={styles.groupBody}>{renderReadOnlyFields(['passport'])}</View>
            {renderTitle('Адрес регистрации')}
            <View style={styles.groupBody}>
                <AddressForm
                    defaultValue={data[PROFILE_FORM.ADDRESS_REGISTRATION].value}
                    errors={data[PROFILE_FORM.ADDRESS_REGISTRATION].error}
                    onChange={value => onChange(PROFILE_FORM.ADDRESS_REGISTRATION, value)}
                    disabled={isDisabled}
                />
            </View>
            <View style={styles.groupBody}>
                <View style={styles.mb20}>
                    <Checkbox
                        value={userAddressesIsEqual}
                        label={locale.userAddressesIsEqual}
                        onChange={value => {
                            setUserAddressesIsEqual(value);
                            setDirty(true);
                        }}
                        disabled={isDisabled}
                    />
                </View>
            </View>
            {!userAddressesIsEqual && (
                <>
                    {renderTitle('Адрес проживания')}
                    <View style={styles.groupBody}>
                        <AddressForm
                            defaultValue={data[PROFILE_FORM.ADDRESS_RESIDENTIAL].value}
                            errors={data[PROFILE_FORM.ADDRESS_RESIDENTIAL].error}
                            onChange={value => onChange(PROFILE_FORM.ADDRESS_RESIDENTIAL, value)}
                            disabled={isDisabled}
                        />
                    </View>
                </>
            )}
            {renderTitle('Дополнительная информация')}
            <View style={styles.groupBody}>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.MATERIAL_STATUS]}
                        disabled={isDisabled}
                        defaultValue={data[PROFILE_FORM.MATERIAL_STATUS].value}
                        data={dictionaryStore.getOptions(ThesaurusTypes.MATERIAL_STATUS)}
                        onSelect={({ id }) => onChange(PROFILE_FORM.MATERIAL_STATUS, id)}
                    />
                </View>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.EDUCATION]}
                        disabled={isDisabled}
                        defaultValue={data[PROFILE_FORM.EDUCATION].value}
                        data={dictionaryStore.getOptions(ThesaurusTypes.EDUCATION)}
                        onSelect={({ id }) => onChange(PROFILE_FORM.EDUCATION, id)}
                    />
                </View>
                <View style={styles.mb20}>
                    <Dropdown
                        label={locale[PROFILE_FORM.INCOME]}
                        disabled={isDisabled}
                        defaultValue={data[PROFILE_FORM.INCOME].value}
                        data={dictionaryStore.getOptions(ThesaurusTypes.INCOME)}
                        onSelect={({ id }) => onChange(PROFILE_FORM.INCOME, id)}
                    />
                </View>
            </View>
            <View style={styles.groupBody}>
                <Button value="Сохранить изменения" disabled={isDisabled || !dirty} onClick={onSubmitForm} />
            </View>
        </View>
    );
};

export default observer(UserProfileForm);
