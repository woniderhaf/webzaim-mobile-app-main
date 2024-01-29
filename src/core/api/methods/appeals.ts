import { AppealsCategoriesResponse } from '../../types';
import { IAppealForm, IUserAppeal } from '../../interfaces';
import { ApiResponse } from '../types';
import WebzaimApi from '../webzaim';

export const getUserAppeals = (): Promise<ApiResponse<Array<IUserAppeal>>> => {
    return WebzaimApi.request('getUserAppeals');
};

export const getAppealFields = (type: string): Promise<ApiResponse<IAppealForm>> => {
    const params = {
        appealType: type
    };

    return WebzaimApi.request('getAppealFields', { params });
};

export const postAppealFields = (type: string, values: Record<string, any>): Promise<ApiResponse<IAppealForm>> => {
    const data = {
        type,
        ...values
    };

    return WebzaimApi.request('postAppealFields', { data });
};

export const getAppealsCategories = (): Promise<ApiResponse<AppealsCategoriesResponse>> => {
    return WebzaimApi.request('getAppealsCategories');
};
