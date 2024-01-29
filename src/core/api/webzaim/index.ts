import { Platform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import { TransformResponse } from '../types';
import Api from '../api';
import WebzaimConfig from './config';

const WebZaimHeaders = {
    'content-type': 'application/json',
    'X-APP-TOKEN': Platform.select({
        ios: Config.X_APP_TOKEN_IOS,
        android: Config.X_APP_TOKEN_ANDROID,
        default: ''
    })
};

const transformResponse: TransformResponse = response => {
    const { data, status } = response;
    const { data: $data, errors, message = '', meta } = data;

    return {
        status,
        data: $data,
        errors,
        message,
        meta
    };
};

const WebzaimApi = new Api(Config.API_URL || '', WebzaimConfig, WebZaimHeaders, transformResponse);

WebzaimApi.requestManager.interceptors.request.use(
    async config => {
        const newConfig = { ...config };

        newConfig.headers = { ...newConfig.headers, 'X-USER-GUID': await DeviceInfo.getUniqueId() };

        return newConfig;
    },
    error => {
        return Promise.reject(error);
    }
);
export default WebzaimApi;
