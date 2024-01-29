import { makeAutoObservable } from 'mobx';
import { IRootStore } from '../core';
import { IUIStore } from '../core/interfaces';
import { ModalProps } from '../core/types';

export class UIStore implements IUIStore {
    rootStore: IRootStore;

    loading = false;

    modal: ModalProps | null = null;

    feedbackBottomSheetModal: boolean = false;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.setModal = this.setModal.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.setFeedbackBottomSheetModal = this.setFeedbackBottomSheetModal.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    setModal(data: ModalProps | null) {
        this.modal = data;
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    setFeedbackBottomSheetModal(value: boolean) {
        this.feedbackBottomSheetModal = value;
    }

    clear() {
        this.loading = false;
        this.modal = null;
    }
}
