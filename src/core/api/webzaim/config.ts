import { ApiConfig } from '../types';

export default {
    // common
    getMainCalculator: ['GET', '', '/pages/main/calculator'],
    postMainCalculator: ['POST', '', '/pages/main/calculator', undefined, true],
    getDynamicPage: ['GET', '', '/pages/dynamic', undefined, true],
    getThesaurus: ['GET', '', '/thesaurus/:type', undefined, true],
    getAppVersion: ['GET', '', '/mobile-version'],
    getCheckSession: ['GET', '', '/user/profile', undefined, false],
    // auth
    postLogin: ['POST', '', '/user/login', undefined, true],
    postLogout: ['POST', '', '/user/logout', undefined, true],
    postPasswordRestore: ['POST', '', '/user/restore', undefined, true],
    postPasswordUpdate: ['POST', '', '/user/password/update', undefined, true],
    // user
    getUserCurrent: ['GET', '', '/user/current', undefined, true],
    getUserProfile: ['GET', '', '/user/profile', undefined, true],
    patchUserProfile: ['PATCH', '', '/user/profile', undefined, true],
    getUserPaymentMethods: ['GET', '', '/account/money-transfer', undefined, true],
    postUserPaymentMethodsBank: ['POST', '', '/account/money-transfer/bank-account', undefined, true],
    getUserReferralLink: ['GET', '', '/user/referral', undefined, true],
    putCurrentPaymentMethod: ['PUT', '', '/account/money-transfer/card/:id', undefined, true],
    deleteCurrentPaymentMethod: ['DELETE', '', '/account/money-transfer/card/:id', undefined, true],
    getUserExternal: ['GET', '', '/user/external', undefined, true],
    // loans
    getCurrentLoan: ['GET', '', '/account/loans/current', undefined, true],
    getCurrentLoanPaymentMethods: ['GET', '', '/account/loans/current/payment-methods', undefined, true],
    getCurrenLoanProlongConfirm: ['GET', '', '/account/loans/current/prolongation/confirmation', undefined, true],
    postCurrenLoanProlongConfirmCheck: [
        'POST',
        '',
        '/account/loans/current/prolongation/confirmation',
        undefined,
        true
    ],
    getCurrenLoanProlongPaymentMethods: [
        'GET',
        '',
        '/account/loans/current/prolongation/payment-methods',
        undefined,
        true
    ],
    postLoanRequest: ['POST', '', '/account/loans/request', undefined, true],
    deleteLoanRequest: ['DELETE', '', '/account/loans/current', undefined, true],
    getLoanRequestConfig: ['GET', '', '/account/loans/request/config', undefined, true],
    getLoanRequestConfirm: ['GET', '', '/account/loans/current/confirmation', undefined, true],
    postLoanRequestConfirmCheck: ['POST', '', '/account/loans/current/confirmation', undefined, true],
    getLoansHistory: ['GET', '', '/account/loans/history', undefined, true],
    checkPromoCode: ['POST', '', '/account/loans/promocodes/check', undefined, true],
    // appeals
    getUserAppeals: ['GET', '', '/account/appeals', undefined, true],
    getAppealsCategories: ['GET', '', '/account/appeals/categories', undefined, true],
    getAppealFields: ['GET', '', '/account/appeals/fields', undefined, true],
    postAppealFields: ['POST', '', '/account/appeals/?appealType=:type', undefined, true],
    // other
    getAbout: ['GET', '', '/cms/wz-about-page', undefined, false],
    getFAQ: ['GET', '', '/cms/wz-faq', undefined, false],
    getAppDocuments: ['GET', '', '/cms/wz-document-list', undefined, false],
    getNews: ['GET', '', '/cms/wz-news', undefined, false],
    getPost: ['GET', '', '/cms/wz-news/:id', undefined, false],
    setFile: ['POST', '', '/files?fileName=:fileName', undefined, true],
    // promotions
    getPromotions: ['GET', '', '/cms/wz-promos', undefined, false],
    getPromotion: ['GET', '', '/cms/wz-promos/:id', undefined, false],
    // registration
    getRegistrationConfig: ['GET', '', '/user/register/config', undefined, false],
    postRegistration: ['POST', '', '/user/register', undefined, false],
    getRegistrationConfirmation: ['GET', '', '/user/current/confirmation', undefined, false],
    postRegistrationConfirmation: ['POST', '', '/user/current/confirmation', undefined, false]
} as ApiConfig;
