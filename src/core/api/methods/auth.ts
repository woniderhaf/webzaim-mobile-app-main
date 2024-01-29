import { ApiResponse } from '../types';
import WebzaimApi from '../webzaim';
import { RegistrationData } from '../../index';

type LoginResponse = {
    token: string;
};

export const postLogin = (login: string | number, password: string): Promise<ApiResponse<LoginResponse>> => {
    return WebzaimApi.request('postLogin', { data: { login, password } });
};

export const postLogout = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('postLogout');
};

export const postPasswordRestore = (login: string, birthDate: number): Promise<ApiResponse<any>> => {
    const data = { login, birthDate };

    return WebzaimApi.request('postPasswordRestore', { data });
};

type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};

export const postPasswordUpdate = (data: ChangePasswordData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('postPasswordUpdate', { data });
};

/**
 * @TODO на бэке обещали сделать метод для проверки сессии
 * или продлить сессию более чем на 30 мин
 * пока проверяем через запрос профиля
 * */
export const getCheckSession = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('getCheckSession');
};

export const getRegistrationConfig = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('getRegistrationConfig');
};

export const postRegistration = (data: RegistrationData): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('postRegistration', { data });
};
export const getRegistrationConfirmation = (): Promise<ApiResponse<any>> => {
    return WebzaimApi.request('getRegistrationConfirmation');
};

export const postRegistrationConfirmation = (code: string): Promise<ApiResponse<any>> => {
    const data = { code };

    return WebzaimApi.request('postRegistrationConfirmation', { data });
};
