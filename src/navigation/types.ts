import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    CompositeScreenProps,
    NavigatorScreenParams,
    RouteProp
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { FastLoginActions, SmsConfirmationTypes } from '../core/enums';
import { IAppDocument, IAppeal } from '../core/interfaces';
import { ROUTES } from './routes';

export type RootStackParamList = {
    // common screens
    [ROUTES.ONBOARDING]: undefined;
    [ROUTES.CALCULATOR]: undefined;
    [ROUTES.UPDATE_APP]: undefined;
    [ROUTES.UNDER_CONSTRUCTION]: undefined;
    [ROUTES.DOCUMENT]: {
        url: string;
        full?: boolean;
        options?: string;
        share?: boolean;
    };
    [ROUTES.PAYMENT]: {
        url: string;
    };
    [ROUTES.ARTICLE]: undefined;
    [ROUTES.SMS_CONFIRMATION]: {
        type: SmsConfirmationTypes;
        phone: string;
        doubleCode: boolean;
        document: string;
        period?: number;
    };
    [ROUTES.ERROR]: undefined;
    [ROUTES.ERROR_500]: undefined;
    [ROUTES.LOG]: undefined;
    [ROUTES.LOAN_ADDON_DESCRIPTION]: {
        text: string;
        name: string;
        docUrl?: string;
        docTitle?: string;
    };
    // main tabs
    [ROUTES.MAIN]: NavigatorScreenParams<MainTabParamList>;
    // auth
    [ROUTES.LOGIN]: undefined;
    [ROUTES.RECOVER_LOGIN]: undefined;
    [ROUTES.FAST_LOGIN]: {
        action?: FastLoginActions;
        backUrl?: keyof RootStackParamList;
        validateSession?: boolean;
    };
    [ROUTES.CHANGE_PASSWORD]: undefined;
    [ROUTES.WELCOME]: undefined;
    // loans
    [ROUTES.LOAN_REQUEST_ADD_CARD]: undefined;
    [ROUTES.LOAN_PROLONGATION_CONFIRM]: undefined;
    // registrations
    [ROUTES.REGISTRATION_VARIANTS]: undefined;
    [ROUTES.REGISTRATION]: undefined;
    [ROUTES.REGISTRATION_DOCUMENTS]: undefined;
    [ROUTES.REGISTRATION_PASSPORT]: undefined;
    [ROUTES.REGISTRATION_ADDRESS]: undefined;
    [ROUTES.REGISTRATION_ADDITIONAL_DATA]: undefined;
    [ROUTES.REGISTRATION_LOAN_REQUEST]: undefined;
    [ROUTES.REGISTRATION_MONEY_TRANSFER]: undefined;
    [ROUTES.REGISTRATION_MONEY_TRANSFER_ADD]: {
        canAddCard?: boolean;
        canAddBankAccount?: boolean;
        cardServiceEndpointRequest?: string;
    };
    [ROUTES.REGISTRATION_CONFIRMATION]: undefined;
    [ROUTES.REGISTRATION_EXTERNAL]: { endpoint: string };
    [ROUTES.LOAN_ADDON_DESCRIPTION]: {
        text: string;
        name: string;
        docUrl?: string;
        docTitle?: string;
    };
    [ROUTES.REGISTRATION_REQUEST_DOCUMENTS]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type MainTabsProps<T extends keyof MainTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type MainTabParamList = {
    [ROUTES.PROMOTIONS_STACK]: NavigatorScreenParams<PromotionsStackParamList>;
    [ROUTES.HISTORY]: undefined;
    [ROUTES.LOANS_STACK]: NavigatorScreenParams<LoansStackParamList>;
    [ROUTES.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;
    [ROUTES.OTHER_STACK]: NavigatorScreenParams<OtherStackParamList>;
};

export type ProfileScreenProps<T extends keyof ProfileStackParamList> = {
    route: RouteProp<ProfileStackParamList, T>;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<MainTabParamList, ROUTES.PROFILE_STACK>,
        StackNavigationProp<ProfileStackParamList, T>
    > &
        StackNavigationProp<RootStackParamList>;
};

export type ProfileStackParamList = {
    [ROUTES.PROFILE_LIST]: undefined;
    [ROUTES.USER_PROFILE]: undefined;
    [ROUTES.USER_APPEALS]: undefined;
    [ROUTES.APPEAL_CREATE]: {
        type: string;
    };
    [ROUTES.APPEALS_CATEGORIES]: undefined;
    [ROUTES.APPEALS_LIST]: {
        id: string;
        title: string;
        appeals: Array<IAppeal>;
    };
    [ROUTES.USER_MONEY_TRANSFER]: undefined;
    [ROUTES.USER_MONEY_TRANSFER_ADD]: {
        canAddCard?: boolean;
        canAddBankAccount?: boolean;
        cardServiceEndpointRequest?: string;
    };
    [ROUTES.USER_MONEY_TRANSFER_ADD_CARD]: {
        endpoint: string;
    };
    [ROUTES.USER_MONEY_TRANSFER_ADD_BANK]: undefined;
    [ROUTES.APP_SETTINGS]: undefined;
    [ROUTES.UNDER_CONSTRUCTION]: undefined;
};

export type LoansScreenProps<T extends keyof LoansStackParamList> = {
    route: RouteProp<LoansStackParamList, T>;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<MainTabParamList, ROUTES.LOANS_STACK>,
        StackNavigationProp<LoansStackParamList, T>
    > &
        StackNavigationProp<RootStackParamList>;
};

export type LoansStackParamList = {
    [ROUTES.USER_LOANS]: undefined;
    [ROUTES.LOAN]: undefined;
    [ROUTES.LOAN_INFO]: undefined;
    [ROUTES.LOAN_DOCUMENTS]: {
        documentsUrl: string;
        share?: boolean;
    };
    [ROUTES.LOAN_PROLONGATION]: undefined;
    [ROUTES.LOAN_PROLONGATION_CONFIRM]: {
        period: number;
        amount: string;
    };
    [ROUTES.LOAN_PAYMENT_METHOD]: {
        sum: number | string;
        includeAddons?: boolean;
    };
    [ROUTES.LOAN_PAYMENT_SUM]: undefined;
    [ROUTES.LOAN_REQUEST_MONEY_TRANSFER]: undefined;
    [ROUTES.LOAN_REQUEST_MONEY_TRANSFER_ADD]: {
        canAddCard?: boolean;
        canAddBankAccount?: boolean;
        cardServiceEndpointRequest?: string;
    };
    [ROUTES.LOAN_REQUEST_DOCUMENTS]: undefined;
    [ROUTES.LOAN_REQUEST_ADD_CARD]: {
        endpoint: string;
    };
    [ROUTES.LOAN_REQUEST_ADD_BANK]: undefined;
    // [ROUTES.LOAN_REQUEST_CONFIRM]: undefined;
    [ROUTES.PASSPORT_SCAN]: undefined;
};

export type OtherStackParamList = {
    [ROUTES.OTHER]: undefined;
    [ROUTES.ABOUT]: undefined;
    [ROUTES.FAQ]: undefined;
    [ROUTES.FAQ_ANSWER]: {
        question: string;
        answer: string;
    };
    [ROUTES.APP_DOCUMENTS_LIST]: undefined;
    [ROUTES.APP_DOCUMENT]: {
        document: IAppDocument;
    };
    [ROUTES.NEWS]: undefined;
    [ROUTES.POST]: {
        id: string;
    };
};

export type OtherStackScreenProps<T extends keyof OtherStackParamList> = {
    route: RouteProp<OtherStackParamList, T>;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<MainTabParamList, ROUTES.OTHER_STACK>,
        StackNavigationProp<OtherStackParamList, T>
    > &
        StackNavigationProp<RootStackParamList>;
};

export type PromotionsStackParamList = {
    [ROUTES.PROMOTIONS]: undefined;
    [ROUTES.PROMOTION]: {
        id: string;
    };
};

export type PromotionsStackScreenProps<T extends keyof PromotionsStackParamList> = {
    route: RouteProp<PromotionsStackParamList, T>;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<MainTabParamList, ROUTES.PROMOTIONS_STACK>,
        StackNavigationProp<PromotionsStackParamList, T>
    > &
        StackNavigationProp<RootStackParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
