import Config from 'react-native-config';
import { TransformResponse } from '../types';
import Api from '../api';
import DadataConfig from './config';

const DadataHeaders = {
    'content-type': 'application/json',
    'api-user': 'mobile',
    'api-token': Config.DADATA_TOKEN || ''
};

const transformResponse: TransformResponse = (response) => {
    const { data, status } = response;

    return {
        status,
        data,
        message: ''
    };
};

const DadataApi = new Api(Config.API_DADATA_URL || '', DadataConfig, DadataHeaders, transformResponse);

export default DadataApi;
