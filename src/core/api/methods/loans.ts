import {
    ICheckPromoCodeResponse,
    ILoan,
    ILoanProlongationConfirm,
    ILoanProlongationResponse,
    ILoanRequestConfig,
    LoanRequestData
} from '../..';
import WebzaimApi from '../webzaim';
import { ApiResponse } from '../types';

export const getLoansHistory = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('getLoansHistory');
};

export const getCurrentLoan = (): Promise<ApiResponse<ILoan>> => {
    return WebzaimApi.request('getCurrentLoan');
};

export const postLoanRequest = (data: LoanRequestData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('postLoanRequest', { data });
};

export const getLoanRequestConfig = (): Promise<ApiResponse<ILoanRequestConfig>> => {
    return WebzaimApi.request('getLoanRequestConfig');
};

export const getCurrenLoanProlongConfirm = (periodDays: number): Promise<ApiResponse<ILoanProlongationConfirm>> => {
    const options = {
        params: {
            periodDays
        }
    };

    return WebzaimApi.request('getCurrenLoanProlongConfirm', options);
};

type ProlongationConfirmationCheckReqParams = {
    periodDays: number;
    code: string;
};

export const postCurrenLoanProlongConfirmCheck = (
    data: ProlongationConfirmationCheckReqParams
): Promise<any | undefined> => {
    return WebzaimApi.request('postCurrenLoanProlongConfirmCheck', { data });
};

export const getLoanRequestConfirm = (): Promise<ApiResponse<ILoanProlongationConfirm>> => {
    return WebzaimApi.request('getLoanRequestConfirm');
};

export const postLoanRequestConfirmCheck = (code: string): Promise<any | undefined> => {
    const data = { code };

    return WebzaimApi.request('postLoanRequestConfirmCheck', { data });
};

export const getCurrenLoanProlongPaymentMethods = (
    periodDays: number
): Promise<ApiResponse<ILoanProlongationResponse>> => {
    const options = { params: { periodDays } };

    return WebzaimApi.request('getCurrenLoanProlongPaymentMethods', options);
};

export const getCurrentLoanPaymentMethods = (
    amount: number | string,
    includeAddons: boolean
): Promise<ApiResponse<ILoanProlongationResponse>> => {
    const options = {
        params: {
            amount,
            includeAddons
        }
    };

    return WebzaimApi.request('getCurrentLoanPaymentMethods', options);
};

export const deleteLoanRequest = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('deleteLoanRequest');
};

export const checkPromoCode = (promoCode: string): Promise<ApiResponse<ICheckPromoCodeResponse>> => {
    const option = { data: { promoCode: promoCode } };

    return WebzaimApi.request('checkPromoCode', option);
};
