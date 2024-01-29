import React, { FunctionComponent } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { BiometryType } from 'react-native-biometrics';
import { RegistrationParamList } from '../navigation';
import { LoanRequestStatus, IPaymentMethodType, LoanLender, ThesaurusTypes, RegistrationType } from './enums';
import {
    IUIStore,
    IHistoryStore,
    IFAQCategory,
    IAboutPage,
    IAppDocument,
    IPostPreview,
    IPost,
    IPromotion,
    IUserProfile,
    IAddress,
    IDocument,
    IUser,
    IUserExternal
} from './interfaces';
import { AddressErrors } from './types';

export interface IRootStore {
    authStore: IAuthStore;
    userStore: IUserStore;
    loanStore: ILoanStore;
    dictionaryStore: IDictionaryStore;
    uiStore: IUIStore;
    historyStore: IHistoryStore;
    commonStore: ICommonStore;
    registrationStore: IRegistrationStore;
    onboardingStep: number;
    appState: string;
    backgroundTime: number;
    onboardingShown: boolean;
    calculator?: ICalculator;
    article?: IArticle;
    setArticle: (article?: IArticle) => any;
    changeAppState: (current: string) => any;
    updateBackgroundTime: (arg0: number) => any;
    increaseStep: () => void;
    clear: () => void;
    changeOnboardingShown: (flag: boolean) => any;
    sensor?: BiometryType;
}

export interface ICommonStore {
    rootStore: IRootStore;
    about: IAboutPage | null;
    faq: Array<IFAQCategory>;
    documents: Array<IAppDocument>;
    news: Array<IPostPreview>;
    post: IPost | null;
    promotions: Array<IPromotion>;
    promotion: IPromotion | null;
    isNeedUpdateMethodPaymentList: boolean;
    fetchAbout: () => Promise<any>;
    fetchFAQ: () => Promise<any>;
    fetchDocuments: () => Promise<any>;
    fetchNews: () => Promise<any>;
    fetchPost: (id: string) => Promise<any>;
    setPost: (data: any) => void;
    fetchPromotions: () => Promise<any>;
    fetchPromotion: (id: string) => Promise<any>;
    setPromotion: (data: IPromotion | null) => void;
    setIsNeedUpdateMethodPaymentList: (flag: boolean) => void;
}

export interface IRegistrationStep {
    id: keyof RegistrationParamList;
    title: string;
    step: number;
}

export type RegistrationStepsMap = Record<string, IRegistrationStep>;

export interface IRegistrationStore {
    rootStore: IRootStore;
    step: IRegistrationStep;
    steps: RegistrationStepsMap;
    config: RegistrationConfig | null;
    regForm: RegistrationData;
    confirmation: RegistrationConfirm | null;
    errors: Array<any>;
    globalError: string;
    registrationOptions: Array<RegistrationOption>;
    setStep: (step: IRegistrationStep) => void;
    fetchRegistrationConfig: () => Promise<any>;
    signUp: (params: RegistrationData) => Promise<any>;
    getConfirmationRegistration: () => Promise<any>;
    setGlobalError: (value: string) => void;
    setErrors: (errors: Record<string, any>) => void;
    setConfirmation: (data: RegistrationConfirm | null) => void;
}

export interface IAuthStore {
    rootStore: IRootStore;
    auth: boolean;
    userLogin: string;
    userPassword: string;
    token: string;
    pinCode: string;
    useBiometrics: boolean;
    pincodeRequire: boolean;
    login: (login: string, password: string, token: string) => Promise<any>;
    logout: (silent?: boolean) => Promise<any>;
    loginPincode: (code: string, useBiometrics: boolean) => Promise<any>;
    changePinCode: (code: string, useBiometrics: boolean) => Promise<any>;
    updateSession: () => Promise<any>;
    authentificate: (value: boolean) => void;
    setUseBiometrics: (value: boolean) => void;
    setUserLogin: (value: string) => void;
    setUserPassword: (value: string) => void;
    setToken: (value: string) => void;
    setPincode: (value: string) => void;
    requestPincode: (value: boolean) => void;
    clear: () => void;
}

export interface IUserStore {
    rootStore: IRootStore;
    user: IUserProfile | undefined;
    userUpdated: boolean;
    error: string;
    registrationAddressError: AddressErrors | null;
    residentialAddressError: AddressErrors | null;
    referralLink: string;
    userExternal?: IUserExternal;
    setUser: (user: IUserProfile) => void;
    setUserWasUpdated: (value: boolean) => void;
    setUserProfileError: (error: string) => void;
    patchUserProfile: (data: Partial<IUserProfile>) => Promise<any>;
    clear: () => void;
    clearAddressErrors: () => void;
    fetchReferralLink: () => Promise<any>;
    setRegistrationAddressError: (key: string, error: string) => void;
    setResidentialAddressError: (key: string, error: string) => void;
    isTestUser: () => boolean;
    getExternalUser: () => Promise<any>;
}

export interface ILoanStore {
    rootStore: IRootStore;
    config: ILoanRequestConfig | undefined;
    activeLoan: ILoan | undefined;
    loanRequest: LoanRequestData | null;
    get loanPaymentSum(): number;
    setLoanRequest: (request: LoanRequestData | null) => void;
    setNewLoanConfig: (config: ILoanRequestConfig) => void;
    setActiveLoan: (loan: ILoan) => void;
    clear: () => void;
}

export interface IDictionaryStore {
    addresses: Record<string, IAddress>;
    userAddresses: any;
    rootStore: IRootStore;
    loading: boolean;
    dictionary: IDictionary | null;
    fetchDictionary: () => Promise;
    setLoading: (value: boolean) => void;
    getTranslate: (value: string, type: ThesaurusTypes) => ITranslate | undefined;
    getOptions: (type: ThesaurusTypes) => Array<ITranslate>;
}

export type IDictionary = Partial<Record<ThesaurusTypes, ITranslate[]>>;

export interface ITranslate {
    id: string;
    title: string;
}

export type RootStoreInitData = {
    login?: string;
    pwd?: string;
    token?: string;
    pinCode?: string;
    useBiometrics?: boolean;
    onboardingShown?: boolean;
    user?: IUser;
    calculator?: ICalculator;
    sensor?: BiometryType | undefined;
};

export type MainLayoutProps = {
    children: React.ReactChild | React.ReactChildren | React.ReactNode;
    contrast?: boolean;
    edges?: SafeAreaViewProps.edges;
    header?: LayoutHeaderProps | undefined;
    theme?: 'white' | 'gray' | 'blue';
    loading?: boolean;
    error?: boolean;
};

export type LayoutHeaderProps = {
    title?: string;
    backButtonShow?: boolean;
    contrast?: boolean;
    rightButtons?: Array<HeaderLayoutButton>;
    onBackPress?: () => any;
    white?: boolean;
};

export type HeaderLayoutButton = {
    icon: string;
    onClick: () => void;
};

export type ComissionTable = Record<string, Array<Record<string, number>>>;

export interface ICalculator {
    loanSize: SliderParams;
    loanTerm: SliderParams;
    commissionTable: Array<ComissionTable>;
}

export interface IAddon {
    id: string;
    displayName: string;
    description: string;
    hiddenDescription: string;
    isApplied: boolean;
    isHidden: boolean;
    documents: Array<IDocument>;
}

export type SliderParams = {
    max: number;
    min: number;
    step: number;
    initial: number;
};

export interface ILoanRequestConfig {
    calculatorSettings: {
        loanSize: SliderParams;
        loanTerm: SliderParams;
        commissionTable: Array<ComissionTable>;
    };
    loyaltyProgram: boolean;
    grace: ILoanRequestConfigGrace;
    documents: Array<IDocument>;
    addons: Array<IAddon>;
}

export interface LoanRequestData {
    loanSize: number; // Размер займа
    loanTerm: number; // Срок
    gracePeriodApplied: boolean; // Признак применен ли льготный период
    appliedAddonIds: Array<string>;
    promoCode?: string;
}

export interface ILoanRequestConfigGrace {
    enabled: boolean;
    periodDays: number;
    boundClicks: number;
    commissionTableWhenApplied?: Array<ComissionTable>;
}

export type ILoanRequestParams = {
    sum: number;
    grace: boolean;
    days: number;
    addons: Array<string>;
    promoCode?: string;
};

export interface ILoanRequestConfigResponce {
    calculatorSettings: ILoanRequestConfig;
}

export interface ILoanProlongationOption {
    periodDays: number;
    cost: string;
}
export interface ILoanPaymentOptions {
    partialPayment: boolean;
    prolongationOptions: Array<ILoanProlongationOption>;
}

export interface ILoanPaymentInfoAddon {
    id: string;
    displayName: string;
    cost: string;
}
export interface ILoanPaymentInfo {
    currency: string;
    loanSize: string;
    maturityDate: string;
    interest: string;
    penalty: string;
    daysUntilRepayment: string;
    totalPayableOnMaturity: string;
    totalPayableToday: string;
    totalPayableTodayNoAddons: string;
    addons: Array<ILoanPaymentInfoAddon>;
    requestedLoanSize?: number;
}

export interface ILoanProlongationConfirm {
    clientPhoneNumber: string;
    offerDocumentDownloadHref: string;
    doubleCode: boolean;
    warningTimeoutSeconds: number;
    code?: number;
}

export interface ILoanRequestConfirm {
    clientPhoneNumber: string;
    offerDocumentHref?: string;
    helpDocumentHref?: string;
    doubleCode: boolean;
    warningTimeoutSeconds: number;
    code?: number;
}

export interface ILoanRequest {
    requestDate: string;
    status: LoanRequestStatus;
    cancellationReason: string;
    canViewCreditHistory: string;
    canViewPartners: string;
    daysUntilNextRequest: number;
    otherOffersLinkHref?: string;
    requirePassportScans?: { mainPage: bool };
}

export interface ILoanCession {
    assigneeName: string;
    brokerName: string;
}

export interface ILoan {
    id: string;
    lender: LoanLender;
    documentNumber: string;
    documentDate: string;
    documentFileHref: string;
    loyaltyProgram: boolean;
    contacts: Array<string>;
    paymentOptions: ILoanPaymentOptions;
    cession?: ILoanCession;
    request: ILoanRequest;
    paymentInfo: ILoanPaymentInfo;
}

export interface ILoanProlongationResponse {
    total: number;
    canChangeTotal: boolean;
    methods: Array<IPaymentMethod>;
}

export interface IPaymentMethod {
    type: IPaymentMethodType;
    title: string;
    description: string;
    commission: number; // комиссия, которую нужно прибавить к сумме
    bankCommissionPercent?: number; // процент банка
    commissionFreeThreshold?: number; // Сумма платежа, выше которой к общей сумме прибавляется комиссия из поля commission. Если передать 0, то комиссия прибавляется всегда.
    agent?: {
        name: string;
        linkHref: string;
    };
    // адрес метода АПИ, который вернет объект Endpoint для сервиса Яндекс для оплаты (см https://conf.web-zaim.ru/pages/viewpage.action?pageId=38517551)
    // адрес метода АПИ, который вернет объект Endpoint для сервиса Payler для оплаты (см https://conf.web-zaim.ru/pages/viewpage.action?pageId=38517551)
    paymentServiceEndpointRequest?: string;
    // адрес метода АПИ, по которому откроется бланк для банковской оплаты (PDF или другой документ). В метод будет передан query-параметр amount - сумма, которую ввел пользователь
    // адрес метода АПИ, по которому откроется бланк для банковской оплаты (PDF или другой документ). В метод будет передан query-параметр amount - сумма, которую ввел пользователь
    paymentFormRequest?: string;
}

export interface IPaymentMethodTransfer {
    id: string;
    status: string;
    maskedPan: string;
    cardPaymentSystem: string;
    current: boolean;
}

export interface IAccountMoneyTransfer {
    paymentMethods: Array<IPaymentMethodTransfer>;
    canAddCard: boolean;
    canAddBankAccount: boolean;
    canChangeCard: boolean;
    canDeleteCard: boolean;
    cardServiceEndpointRequest: string;
}

export interface ISale {
    title: string;
    description: string;
    content: string;
    date: string;
}

export interface IArticle {
    title: string;
    description: Array<string>;
    date: string;
    endDate?: string;
    image?: string;
}

export type IFormValidator = (value: any, data: IFormData) => any;

export type IFormDataError = {
    name: string;
    error: string;
};

export interface IFormDataItem {
    name: string;
    value: any;
    validators: Array<IFormValidator>;
    error?: any;
    component?: React.FC | React.ForwardRefExoticComponent<any> | JSX.Element;
    controlProps?: Record<any, any>;
    formatter?: (value: any) => any;
}

export interface IFormData {
    [key: string]: IFormDataItem;
}

export type RegistrationConfig = {
    minAge: number;
    maxAge: number;
    esiaServiceEndpointRequest: string;
    tinkoffServiceEndpointRequest: string;
    showCaptcha: boolean;
    loyaltyProgram: boolean;
    documents: Array<IDocument>;
};

export type RegistrationOption = {
    type: RegistrationType;
    endpoint?: string;
};

export type RegistrationData = {
    name: string;
    surname: string;
    patronymic: string;
    birthDate: number;
    phoneNumber: string;
    email: string;
    password: string;
};

export type RegistrationConfirm = {
    clientPhoneNumber: string;
    doubleCode: boolean;
    helpDocumentHref?: string;
};

export interface ICheckPromoCodeResponse {
    status: 'OK' | 'NOT_FOUND';
}
