import { AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from 'axios';

export type ApiConfig = {
    [key: string]: [method: string, version: string, url: string, options?: RquestOptions, authRequire?: boolean];
};

export type RquestOptions = {
    timeout?: number;
};

export type ApiResponse<T> = {
    status: number;
    data?: T;
    errors?: ApiResponseError;
    message: string;
    meta?: any;
};

export type ApiResponseError = Record<string, Array<string> | string>;

export type TransformResponse = (response: AxiosResponse) => ApiResponse<any>;

export type Apilog = {
    time: number;
    method: string | undefined;
    url: string | undefined;
    request: {
        headers: AxiosRequestHeaders | undefined;
        params: any;
        data: any;
    };
    response: {
        status: number;
        message: any;
        headers: AxiosResponseHeaders;
        errors: any;
        data: any;
    };
};

export type CustomRequestOptions = {
    params?: Record<string, any>;
    data?: Record<string, any>;
};

export type AuthRequiredCallback = () => any;
