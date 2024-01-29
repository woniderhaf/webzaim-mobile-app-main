import { getDate, getMonth, getYear, format } from 'date-fns';
import plural from '../locales/plural';

export const amountFormat = (value: any, currency?: boolean | undefined) => {
    const [int, frct] = String(value).split(/[\.|\,]/);

    let amount = String(int)
        .split('')
        .reverse()
        .map((item, index) => (index % 3 > 1 ? ` ${item}` : item))
        .reverse()
        .join('');

    if (frct) {
        amount += `.${frct.length === 1 ? frct + '0' : frct}`;
    }

    return currency ? `${amount}\u00A0\u20BD` : amount;
};

export const numberFormat =
    (integerLenght = 9, fractionLenght = 2, decimals = [',', '.']) =>
    (value: string) => {
        if (!value) {
            return value;
        }

        let integer = value;
        let fraction = '';
        let separator = '';

        const limit = (n: string, size: number) => n.replace(/[^\d]/g, '').substring(0, size);

        decimals.forEach(decimal => {
            const index = value.indexOf(decimal);

            if (index > -1) {
                integer = value.substring(0, index);
                fraction = value.substring(index + 1, value.length);
                separator = decimal;
            }
        });

        return `${limit(integer, integerLenght)}${separator}${limit(fraction, fractionLenght)}`;
    };

export const daysFormat = (value: number): string => {
    return plural(value, '%d день', '%d дня', '%d дней');
};

export const dateFormat = (value: number, isLocal?: boolean): string => {
    const $value = isLocal ? value : value * 1000;

    return format($value, 'dd.MM.yyyy');
};

export const apiDateToDate = (value: number): Date => {
    return new Date(Number(getYear(value * 1000)), Number(getMonth(value * 1000)), Number(getDate(value * 1000)));
};

export const dateToUTC = (value: Date | string): number => {
    const $date = new Date(value);
    const bth = Date.UTC($date.getFullYear(), $date.getMonth(), $date.getDate()) / 1000;

    return bth;
};

export const phoneCodeReplacer = (phone: string): string => {
    return phone[0] === '+' ? phone : `+7${phone.slice(1, phone.length)}`;
};

export const clearPhoneMask = (phone: string = ''): string => {
    return phone.replace(/-/g, '');
};

export const textReplacerRU = (value: string = ''): string => {
    return value.replace(/[^а-яА-Я]/g, '');
};

export const emailReplacer = (value: string = ''): string => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, '');
};

export const passwordReplacer = (value: string = ''): string => {
    return value.replace(/[^a-zA-Z0-9!@#$%^&*)(+=._-]/g, '');
};

export const birthPlaceReplacer = (value: string = ''): string => {
    return value.replace(/[^а-яА-Я0-9/)(.-]\s/g, '');
};

export const textReplacerRUWithSymbols = (value: string = ''): string => {
    return value.trimStart().replace(/[^а-яА-Я0-9., ]/g, '');
};
