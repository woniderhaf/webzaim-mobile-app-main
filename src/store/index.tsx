import React, { createContext, ReactNode, useContext } from 'react';
import { IRootStore } from '../core';
import { RootStore } from './RootStore';

let store: IRootStore;
const StoreContext = createContext<IRootStore | undefined>(undefined);

StoreContext.displayName = 'StoreContext';

export function RootStoreProvider({ children, data }: { children: ReactNode, data?: any }) {
    let $store: IRootStore = store ?? new RootStore(data);

    if (!store) {
        store = $store;
    }

    return <StoreContext.Provider value={$store}>{children}</StoreContext.Provider>;
}

export function useRootStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useRootStore need RootStoreProvider');
    }

    return context;
}

export function useAuthStore() {
    const { authStore } = useRootStore();

    return authStore;
}

export function useUserStore() {
    const { userStore } = useRootStore();

    return userStore;
}

export function useLoanStore() {
    const { loanStore } = useRootStore();

    return loanStore;
}

export function useDictionaryStore() {
    const { dictionaryStore } = useRootStore();

    return dictionaryStore;
}

export function useUIStore() {
    const { uiStore } = useRootStore();

    return uiStore;
}

export function useHistoryStore() {
    const { historyStore } = useRootStore();

    return historyStore;
}

export function useCommonStore() {
    const { commonStore } = useRootStore();

    return commonStore;
}

export function useRegistrationStore() {
    const { registrationStore } = useRootStore();

    return registrationStore;
}
