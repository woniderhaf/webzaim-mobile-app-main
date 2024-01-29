import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import qs from 'qs';
import Config from 'react-native-config';
import { ApiConfig, Apilog, ApiResponse, AuthRequiredCallback, CustomRequestOptions, TransformResponse } from './types';

const DEV = Config.ENV === 'development';

export default class Api {
    requestManager: AxiosInstance;

    authToken: string = '';

    config: ApiConfig = {};

    apiLog: Array<Apilog> = [];

    authRequiredCallback: AuthRequiredCallback | null = null;

    constructor(
        apiUrl: string,
        config: ApiConfig,
        headers?: AxiosRequestHeaders,
        transformResponse?: TransformResponse
    ) {
        this.requestManager = axios.create({
            baseURL: apiUrl,
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                ...(headers || {})
            },
            paramsSerializer: params => qs.stringify(params),
            validateStatus: status => {
                return true;
            }
        });

        this.requestManager.interceptors.response.use((response: AxiosResponse) => {
            if (DEV) {
                this.setLog(response);
            }

            return transformResponse ? transformResponse(response) : response;
        });

        this.config = { ...config };
    }

    token(token: string) {
        this.authToken = token;
    }

    /**
     * Если у запроса в конфиге {ApiConfig}
     * стоит authRequire = true, а запрос вернулся
     * со status === 401 и выставлен этот callback
     * то перед transformResponse выполняется этот callback
     * TODO надо бы подумать над более удачной проверкой
     */
    setAuthRequiredCallback(callback: AuthRequiredCallback) {
        this.authRequiredCallback = callback;
    }

    setLog(response: AxiosResponse) {
        const { data, status, config, headers } = response;
        const { data: $data, errors, message = '' } = data;

        this.apiLog.push({
            time: Date.now(),
            url: config.url,
            method: config.method?.toUpperCase(),
            request: {
                headers: config.headers,
                params: config.params,
                data: config.data
            },
            response: {
                status,
                headers,
                message,
                errors,
                data: $data
            }
        });
    }

    getLog() {
        return this.apiLog;
    }

    createRequest<T>(method: string, url: string, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const { params, data, ...requestOptions } = options || {};

        switch (method) {
            case 'GET':
                return this.requestManager.get(url, { ...requestOptions, params });
            case 'POST':
                return this.requestManager.post(url, data, { ...requestOptions });
            case 'DELETE':
                return this.requestManager.delete(url, { ...requestOptions });
            case 'PATCH':
                return this.requestManager.patch(url, data, { ...requestOptions });
            case 'PUT':
                return this.requestManager.put(url, data, { ...requestOptions });
            default:
                return Promise.reject('Method not allow');
        }
    }

    request<T>(endpoint: keyof ApiConfig, options?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        if (!this.config[endpoint]) {
            throw new Error('Method not exist');
        }

        const regexp = /:[\w]+/g;
        const [method, version, endpointUrl, configOptions, authRequire] = this.config[endpoint];

        let url = version ? `/${version}` : '';

        //@ts-ignore
        // const { params, data, ...otherOptions } = options ? JSON.parse(JSON.stringify(options)) : {};
        const { params, data, ...otherOptions } = options || {};

        /**
         * Подставляем данные из параметров в data или params в урл
         * /api/example/:id => /api/example/exampleId
         */
        url += endpointUrl.replace(regexp, str => {
            const key = str.slice(1);
            let replaceStr = str;

            if (params && params[key]) {
                replaceStr = params[key];

                delete params[key];
            } else if (data && data[key]) {
                replaceStr = data[key];

                delete data[key];
            }

            return replaceStr;
        });

        const timeout = (configOptions && configOptions.timeout) || 60 * 1000;

        this.requestManager.defaults.timeout = timeout;

        let requestOptions = { ...(otherOptions || {}) };

        if (this.authToken) {
            requestOptions = {
                ...requestOptions,
                headers: {
                    ...(requestOptions.headers || {}),
                    Authorization: `Bearer ${this.authToken}`
                }
            };
        }

        return this.createRequest<T>(method, url, { data, params, ...requestOptions }).then(response => {
            if (authRequire && response.status === 401 && this.authRequiredCallback) {
                this.authRequiredCallback();
            }

            return response;
        });
    }

    customRequest<T = any>(
        method: 'GET' | 'POST',
        url: string,
        options?: CustomRequestOptions
    ): Promise<ApiResponse<T>> {
        const $options: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${this.authToken}`
            }
        };

        if (method === 'POST') {
            return this.requestManager.post(url, options?.data, $options);
        } else if (method === 'GET') {
            if (options?.params) {
                $options.params = { ...options.params };
            }

            return this.requestManager.get(url, $options);
        }

        return Promise.reject({ status: 500, errors: [] });
    }
}
