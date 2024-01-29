export * from './animation';
export * from './formatters';
export * from './validators';
export * from './helpers';

export const PHONE_MASK = ['+', '7', ' ', '(', ' ', /\d/, /\d/, /\d/, ' ', ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
export const SIX_PIN_MASK = [/\d/, /\d/, /\d/, ' ', '/', ' ', /\d/, /\d/, /\d/]; // 000 / 000
export const FOUR_PIN_MASK = [/\d/, /\d/, /\d/, /\d/]; // 0000
export const PASSPORT_NUMBER = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]; // 0000 0000000
export const PASSPORT_SUBUNIT_CODE = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]; // 000-000
