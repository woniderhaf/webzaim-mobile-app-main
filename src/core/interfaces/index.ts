import { BiometryType } from 'react-native-biometrics/index';
import { AppealFormFieldType, HIstoryItemStatusTypes, LoanLender, UserAppealsStatus } from '../enums';
import { ModalProps } from '../types';
/**
 *
 * User
 */
export interface IUser extends IUserCurrent, IUserProfile {}

export interface IUserExternal {
    name: string;
    surname: string;
    patronymic: string;
    birthDate: number;
    phoneNumber: string;
    email: string;
    source: string;
    canEditBirthDate: boolean;
    canEditName: boolean;
    canEditPhoneNumber: boolean;
    passportScanUrl: string | null;
}

export interface IUserCurrent {
    message: string;
    code: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    loyaltyProgram: boolean;
    isConfirmed: boolean;
    registrationComplete: boolean;
}

export interface IUserProfile {
    name: string;
    surname: string;
    patronymic: string;
    birthDate: number;
    phoneNumber: string;
    email: string;
    additionalPhoneNumber: string;
    maritalStatus: string;
    education: string;
    income: string;
    canEditData: boolean;
    canEditPassportData: boolean;
    phoneConfirm?: boolean;
    requirePassportScans: boolean;
    passport: IUserPassport;
    passportScans: IDocumentScan;
    registrationAddress: IUserAddress;
    residentialAddress: IUserAddress;
    userGroup: number;
}

export interface IUserPassport {
    series: string;
    number: string;
    issuer: string;
    subunitCode: string;
    issueDate: number;
    birthPlace: string;
}

export interface IUserAddress {
    flat: string;
    house: string;
    postalCode: string;
    street: string;
    cityKladrId: string;
}

export interface IDocument {
    title: string;
    href: string;
}

export interface IDocumentScan {
    mainPage?: string;
    registrationPage?: string;
    selfie?: string;
}

/**
 *
 * Appeals
 */
export interface IUserAppeal {
    documentNumber: string;
    documentDate: number | null;
    status: UserAppealsStatus;
    fileHref?: string;
}

export interface IAppeal {
    type: string;
    title: string;
    important: boolean;
}

export interface IAppealsCategory {
    id: string;
    title: string;
    appeals: Array<IAppeal>;
}

export interface IAppealForm {
    title: string;
    description?: string;
    groups: Array<IAppealFormGroup>;
}

export interface IAppealFormGroup {
    title: string;
    fields: Array<IAppealFormField>;
}

export interface IAppealFormField {
    required: boolean;
    name: string;
    label: string;
    type: AppealFormFieldType;
}
/**
 *
 * Store
 *
 */
export interface IUIStore {
    loading: boolean;
    modal: ModalProps | null;
    feedbackBottomSheetModal: boolean;
    setModal: (data: ModalProps | null) => void;
    setLoading: (value: boolean) => void;
    setFeedbackBottomSheetModal: (value: boolean) => void;
    clear: () => void;
}

export interface IHistoryStore {
    history: Array<IHistoryItem>;
    filterByStatus: HIstoryItemStatusTypes | null;
    fetchHistory: () => Promise<any>;
    get getHistory(): Array<IHistoryItem>;
    setFilter: (filter?: HIstoryItemStatusTypes) => void;
    setHistory: (data: Array<IHistoryItem>) => void;
    clear: () => void;
}
/**
 *
 * History
 *
 */
export interface IHistoryItem {
    status: HIstoryItemStatusTypes;
    lender: LoanLender;
    documentNumber: string;
    documentDate: number;
}
/**
 *
 * DADATA
 *
 */
export interface IDadataAddressSuggest {
    value: string;
    data: {
        postal_code: string;
        region: string;
        region_kladr_id: string;
        city: string;
        city_kladr_id: string;
        street: string;
        settlement: string;
        settlement_kladr_id: string;
        region_fias_id?: string;
        city_fias_id?: string;
        street_fias_id?: string;
        settlement_fias_id?: string;
        house: string;
    };
}
/**
 *
 * Profile
 *
 */
export type IAppSettings = {
    [key in BiometryType]?: boolean;
} & {
    push?: boolean;
    sms?: boolean;
};

/**
 *
 * Forms
 *
 */
export interface IAddress {
    region: string;
    city: string;
    street: string;
    house: string;
    flat: string;
    cityKladrId: string;
    postalCode: string;
}

export interface IAddressItem {
    title: string;
    value?: IDadataAddressSuggest;
}

export interface IUserAddressFull extends IUserAddress {
    region: string;
    city: string;
}

export interface IFAQCategory {
    id: string;
    title: string;
    questions: Array<IFAQCategoryItem>;
    uid?: string;
}

export interface IFAQCategoryItem {
    id: string;
    question: string;
    answer: string;
}

export interface IAppDocument {
    id: number;
    title: string;
    description?: string;
    documents: Array<IAppDocumentFile>;
}

export interface IAppDocumentFile {
    id: string;
    title?: string;
    file: {
        url: string;
        name: string;
    };
}

export interface IAboutPage {
    id: string;
    createdAt: string;
    updatedAp: string;
    blocks: Array<IAboutPageBlock>;
}

export interface IAboutPageBlock {
    id: string;
    text?: string;
    title?: string;
    url?: string;
}

export interface IPostPreview {
    id: string;
    title: string;
    date: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: string;
}

export interface IPost {
    id: string;
    title: string;
    date: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: string;
    mainImage: {
        id: string;
        caption: string;
        image: IPostImage;
    };
    blocks: Array<IPostBlock>;
}

export interface IPostImage {
    id: string;
    name: string;
    width: number;
    height: number;
    url: string;
    hash: string;
}

export interface IPostBlock {
    id: string;
    text?: string;
    image?: IPostImage;
}

export interface IPromotion {
    id: string;
    title: string;
    date: string;
    teaser: string;
    actionButtonHref: string;
    slug: string;
    actionButtonTitle: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    alternativeUrl: string;
    image?: IPostImage;
}

export interface IFiles {
    id: string;
}
