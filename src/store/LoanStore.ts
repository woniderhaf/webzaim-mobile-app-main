import { makeAutoObservable } from 'mobx';
import { ILoan, ILoanRequestConfig, ILoanStore, IRootStore, LoanRequestData } from '../core';

export class LoanStore implements ILoanStore {
    rootStore: IRootStore;

    config: ILoanRequestConfig | undefined = undefined;

    activeLoan: ILoan | undefined = undefined;

    loanRequest: LoanRequestData | null = null;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.setNewLoanConfig = this.setNewLoanConfig.bind(this);
        this.setActiveLoan = this.setActiveLoan.bind(this);
        this.setLoanRequest = this.setLoanRequest.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    get loanPaymentSum() {
        if (this.activeLoan) {
            const { totalPayableToday } = this.activeLoan.paymentInfo;

            return Number(totalPayableToday) || 0;
        }

        return 0;
    }

    setLoanRequest(request: LoanRequestData | null) {
        this.loanRequest = request;
    }

    setNewLoanConfig(config: ILoanRequestConfig) {
        this.config = config;
    }

    setActiveLoan(loan: ILoan) {
        this.activeLoan = loan;
    }

    clear() {
        this.config = undefined;
        this.activeLoan = undefined;
        this.loanRequest = null;
    }
}
