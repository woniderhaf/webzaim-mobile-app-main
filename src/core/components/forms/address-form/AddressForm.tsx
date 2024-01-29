import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { IAddress, IDadataAddressSuggest } from '../../../interfaces';
import { AddressErrors, DadataAddressParams, IOption } from '../../../types';
import { Checkbox, Input, InputSuggestions } from '../../../ui';
import { postFindAddress } from '../../../api';
import locale from './locale';

type AddressProps = {
    defaultValue?: IAddress;
    onChange: (data: IAddress) => any;
    disabled?: boolean;
    errors?: AddressErrors;
};

const ADDRESS_FORM: Record<string, keyof IAddress> = {
    REGION: 'region',
    CITY: 'city',
    STREET: 'street',
    HOUSE: 'house',
    FLAT: 'flat'
};

const DEPENDENT_FIELDS = [ADDRESS_FORM.REGION, ADDRESS_FORM.CITY, ADDRESS_FORM.STREET];

const AddressForm = ({ defaultValue, onChange, disabled, errors }: AddressProps) => {
    const [$errors, setErrors] = useState<AddressErrors>(errors || {});
    const [address, setAddress] = useState<IAddress>({
        region: defaultValue?.region || '',
        city: defaultValue?.city || '',
        street: defaultValue?.street || '',
        house: defaultValue?.house || '',
        flat: defaultValue?.flat || '',
        cityKladrId: defaultValue?.cityKladrId || '',
        postalCode: defaultValue?.postalCode || ''
    });
    const [withoutStreet, setWithoutStreet] = useState(defaultValue?.street === '-');

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            setErrors({ ...errors });
        }
    }, [errors]);

    const onSelectAddress = (key: keyof IAddress, item: IOption) => {
        let $address: IAddress = {
            ...address,
            [key]: item.title
        };

        if (key === ADDRESS_FORM.REGION) {
            $address.cityKladrId = (item.value.data.region_kladr_id || '').substring(0, 13);
        }

        if (key === ADDRESS_FORM.CITY) {
            $address.cityKladrId = (item.value.data.settlement_kladr_id || item.value.data.city_kladr_id || '').substring(0, 13);
        }

        if (key === ADDRESS_FORM.STREET) {
            $address.postalCode = item.value.data.postal_code || '';
        }

        setAddress($address);
        onChange($address);
        setErrors({ ...errors, [key]: '' });
    };

    const onChangeAddress = (key: keyof IAddress, value: string) => {
        let $address: IAddress = {
            ...address,
            [key]: value
        };

        if (DEPENDENT_FIELDS.includes(key)) {
            $address.postalCode = '';

            if (key === ADDRESS_FORM.REGION) {
                $address[ADDRESS_FORM.CITY] = '';
                $address[ADDRESS_FORM.STREET] = withoutStreet ? '-' : '';
                $address.cityKladrId = '';
            }

            if (key === ADDRESS_FORM.CITY) {
                $address[ADDRESS_FORM.STREET] =  withoutStreet ? '-' : '';
                $address.cityKladrId = '';
            }
        }

        setAddress($address);
        onChange($address);
        setErrors({ ...errors, [key]: '' });
    };

    const onBlur = (field: keyof IAddress) => {
        if (address[field] && !address.cityKladrId) {
            setErrors({ ...$errors, [field]: 'Поле обязательно для заполнения' });
        }
    };

    const fetchAddressSuggestions = async (key: keyof IAddress, query: string): Promise<Array<IOption>> => {
        const { cityKladrId, region } = address;

        let options:Array<IOption> = [];

        let params: DadataAddressParams = {
            count: 5,
            query,
            restrict_value: true,
            from_bound: { value: key },
            to_bound: { value: key }
        };

        if (key === ADDRESS_FORM.CITY || key === ADDRESS_FORM.STREET) {
            if (key === ADDRESS_FORM.CITY) {
                params.from_bound = { value: 'city' };
                params.to_bound = { value: 'settlement' };

                if (cityKladrId) {
                    params.locations = [{ kladr_id: cityKladrId }];
                    params.locations_boost = [{ kladr_id: cityKladrId }];
                } else {
                    params.locations = [{ region }];
                    params.locations_boost = [{ region }];
                }
            } else {
                params.locations = [{ kladr_id: cityKladrId }];
                params.locations_boost = [{ kladr_id: cityKladrId }];
            }
        }

        try {
            const { data } = await postFindAddress(params);

            if (data && data.suggestions) {
                options = parseSuggestions(data.suggestions, key);
            }
        } finally {
            return options;
        }
    };

    const parseSuggestions = (data: Array<IDadataAddressSuggest>, type: string): Array<IOption> => {
        return data.map((item) => ({
            value: item,
            title: type === ADDRESS_FORM.CITY
                ? (item.data.settlement || item.data.city)
                // @ts-ignore
                : (item.data[type] || item.value)
        }));
    };

    const fields = Object.values(ADDRESS_FORM) as Array<keyof IAddress>;

    return (
        <>
            {fields.map((field) => {
                if (DEPENDENT_FIELDS.includes(field)) {
                    return (
                        <React.Fragment key={field}>
                            <InputSuggestions
                                label={locale[field]}
                                value={address[field]}
                                error={$errors[field]}
                                onBlur={() => onBlur(field)}
                                onChangeQuery={(query) => onChangeAddress(field, query)}
                                onSelect={(item) => onSelectAddress(field, item)}
                                fetchData={(query) => fetchAddressSuggestions(field, query)}
                                disabled={disabled || field === ADDRESS_FORM.STREET && withoutStreet}
                            />
                            {field === ADDRESS_FORM.STREET && (
                                <View style={{ marginBottom: 20, marginTop: 5 }}>
                                    <Checkbox
                                        value={withoutStreet}
                                        label={locale.withoutStreet}
                                        onChange={(value) => {
                                            setWithoutStreet(value);
                                            // если нет улицы надо отправлять "-"  ¯\_(ツ)_/¯
                                            if (value) {
                                                onChangeAddress(field, '-');
                                            } else {
                                                onChangeAddress(field, '');
                                            }
                                        }}
                                        disabled={disabled}
                                    />
                                </View>
                            )}
                        </React.Fragment>
                    );
                }

                return (
                    <Input
                        key={field}
                        label={locale[field]}
                        value={address[field]}
                        error={$errors[field]}
                        disabled={disabled}
                        onChange={(value) => onChangeAddress(field, value)}
                    />
                );
            })}
        </>
    );
};

export default observer(AddressForm);
