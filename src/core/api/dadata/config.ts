import { ApiConfig } from '../types';

export default {
    postFindAddressById:                ['POST', 'v1', '/findById/address'],
    postFindAddress:                    ['POST', 'v1', '/suggest/address'],
    postFIO:                            ['POST', 'v1', '/suggest/fio'],
    postEmail:                          ['POST', 'v1', '/suggest/email'],
    postFMS:                            ['POST', 'v1', '/suggest/fms_unit']
} as ApiConfig;
