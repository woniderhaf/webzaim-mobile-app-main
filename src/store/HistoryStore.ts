import { makeAutoObservable } from 'mobx';
import { IRootStore } from '../core';
import { getLoansHistory } from '../core/api';
import { HIstoryItemStatusTypes } from '../core/enums';
import { IHistoryItem, IHistoryStore } from '../core/interfaces';

export class HistoryStore implements IHistoryStore {
    rootStore: IRootStore;

    history: Array<IHistoryItem> = [];

    filterByStatus: HIstoryItemStatusTypes | null = null;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.fetchHistory = this.fetchHistory.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this);
    }

    async fetchHistory() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getLoansHistory();

            if (data) {
                this.setHistory(data);
            }
        } finally {
            setLoading(false);
        }
    }

    setHistory(data: Array<IHistoryItem>) {
        this.history = [...data];
    }

    setFilter(filter?: HIstoryItemStatusTypes) {
        this.filterByStatus = filter ?? null;
    }

    get getHistory() {
        return this.history
            .filter((item) => !this.filterByStatus || item.status === this.filterByStatus);
    }

    clear() {
        this.history = [];
        this.filterByStatus = null;
    }
}
