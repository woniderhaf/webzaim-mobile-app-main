import { ADDRESS_FORM, PROFILE_FORM } from '../../../enums';

export default {
    [ADDRESS_FORM.REGION]: 'Область / край',
    [ADDRESS_FORM.CITY]: 'Город / поселение',
    [ADDRESS_FORM.STREET]: 'Улица',
    [ADDRESS_FORM.HOUSE]: 'Дом',
    [ADDRESS_FORM.FLAT]: 'Квартира',
    withoutStreet: 'Нет улицы'
} as Record<any, any>;
