import { IAboutPage, IAppDocument, IFAQCategory, IFiles, IPost, IPostPreview, IPromotion } from '../../interfaces';
import { ICalculator, ISale, ITranslate } from '../..';
import { ThesaurusTypes } from '../../enums';
import { ApiResponse } from '../types';
import WebzaimApi from '../webzaim';

export const getMainCalculator = (): Promise<ApiResponse<ICalculator>> => {
    return WebzaimApi.request('getMainCalculator');
};

export const getDynamicPageSales = (): Promise<ApiResponse<ISale>> => {
    const options = {
        params: {
            pageId: 'akcii'
        }
    };

    return WebzaimApi.request('getDynamicPage', options);
};

export const getThesaurus = (type: ThesaurusTypes): Promise<ApiResponse<Array<ITranslate>>> => {
    return WebzaimApi.request('getThesaurus', { params: { type } });
};

export const checkAppVersion = (os: string, version: string): Promise<ApiResponse<any>> => {
    const options = {
        params: { type: os, version }
    };

    return WebzaimApi.request('getAppVersion', options);
};

export const getAbout = (): Promise<ApiResponse<IAboutPage>> => {
    return WebzaimApi.request('getAbout');
};

export const getFAQ = (): Promise<ApiResponse<{ items: Array<IFAQCategory> }>> => {
    return WebzaimApi.request('getFAQ');
};

export const getAppDocuments = (): Promise<ApiResponse<{ items: Array<IAppDocument> }>> => {
    return WebzaimApi.request('getAppDocuments');
};

export const getNews = (): Promise<ApiResponse<Array<IPostPreview>>> => {
    return WebzaimApi.request('getNews');
};

export const getPost = (id: string): Promise<ApiResponse<IPost>> => {
    return WebzaimApi.request('getPost', { params: { id } });
};

export const getPromotions = (): Promise<ApiResponse<Array<IPromotion>>> => {
    return WebzaimApi.request('getPromotions');
};

export const getPromotion = (id: string): Promise<ApiResponse<IPromotion>> => {
    return WebzaimApi.request('getPromotion', { params: { id } });
};

export const setFiles = (file: string): Promise<ApiResponse<IFiles>> => {
    const data = new FormData();

    data.append('fileBase64', file);

    const options = {
        data: data,
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return WebzaimApi.request('setFile', options);
};
