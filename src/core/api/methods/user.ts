import { IAccountMoneyTransfer } from '../..';
import { IUserCurrent, IUserExternal, IUserProfile } from '../../interfaces';
import WebzaimApi from '../webzaim';
import { ApiResponse } from '../types';

export const getUserProfile = (): Promise<ApiResponse<IUserProfile>> => {
    return WebzaimApi.request('getUserProfile');
};

export const getUserCurrent = (): Promise<ApiResponse<IUserCurrent>> => {
    return WebzaimApi.request('getUserCurrent');
};

export const patchUserProfile = (data: Partial<IUserProfile>): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('patchUserProfile', { data });
};

export const getUserPaymentMethods = (): Promise<ApiResponse<IAccountMoneyTransfer>> => {
    return WebzaimApi.request('getUserPaymentMethods', {
        headers: { accept: 'application/agw.api.v2+json' }
    });
};

type AccountMoneyTransferBankAccountData = {
    bic: string;
    account: string;
};

export const postUserPaymentMethodsBank = (data: AccountMoneyTransferBankAccountData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('postUserPaymentMethodsBank', { data });
};

export const getUserReferralLink = (): Promise<ApiResponse<{ link: string }>> => {
    return WebzaimApi.request('getUserReferralLink');
};

type PaymentMethodData = {
    id: string;
};

export const putCurrentPaymentMethod = (data: PaymentMethodData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('putCurrentPaymentMethod', { params: data });
};

export const deleteCurrentPaymentMethod = (data: PaymentMethodData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('deleteCurrentPaymentMethod', { params: data });
};

export const getUserExternal = (): Promise<ApiResponse<IUserExternal>> => {
    return WebzaimApi.request('getUserExternal');
};
