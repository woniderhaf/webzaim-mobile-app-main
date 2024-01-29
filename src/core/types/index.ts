import { ButtonApperiance, DadataFIOTypes } from '../enums';
import { IAddress, IAppealsCategory, IDadataAddressSuggest } from '../interfaces';

export type AppealsCategoriesResponse = Array<IAppealsCategory>;

export type ModalButton = {
    label: string;
    apperiance?: ButtonApperiance;
    onPress: () => any;
};

export type ModalProps = {
    buttons: Array<ModalButton>;
    title?: string;
    message?: string;
    verticalButtons?: boolean;
};

export type DadataAddressResponse = {
    suggestions: Array<IDadataAddressSuggest>;
};

export type DadataAddressParams = {
    query: string;
    count?: number;
    to_bound?: { value: string };
    from_bound?: { value: string };
    restrict_value?: boolean;
    locations_boost?: Array<Record<string, any>>;
    locations?: Array<Record<string, any>>;
};

export type DadataFIOParams = {
    query: string;
    parts: Array<DadataFIOTypes>;
};

export type DadataEmailParams = {
    query: string;
};

export type DadataFMSParams = {
    query: string;
};

export type IDropdownOption = {
    id: string;
    title: string;
};

export type IOption = {
    title: string;
    value: any;
};

export type AddressErrors = {
    [key in keyof IAddress]?: string;
};
