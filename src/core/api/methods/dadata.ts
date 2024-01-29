import { ITranslate } from '../..';
import {
    DadataAddressParams,
    DadataAddressResponse,
    DadataEmailParams,
    DadataFIOParams,
    DadataFMSParams
} from '../../types';
import { ApiResponse } from '../types';
import DadataApi from '../dadata';

export const postFindAddressById = (query: string): Promise<ApiResponse<Array<ITranslate>>> => {
    const data = {
        count: 1,
        query: Number(query)
    };

    return DadataApi.request('postFindAddressById', { data });
};

export const postFindAddress = (data: DadataAddressParams): Promise<ApiResponse<DadataAddressResponse>> => {
    return DadataApi.request('postFindAddress', { data });
};

export const postFIO = (data: DadataFIOParams): Promise<ApiResponse<any>> => {
    return DadataApi.request('postFIO', { data });
};

export const postEmail = (data: DadataEmailParams): Promise<ApiResponse<any>> => {
    return DadataApi.request('postEmail', { data });
};

export const postFMS = (data: DadataFMSParams): Promise<ApiResponse<any>> => {
    return DadataApi.request('postFMS', { data });
};
