import React, { createContext, ReactNode, useContext } from 'react';

export interface ICommonContext {
    api: any,
    locales: any
}

const CommonContext = createContext<ICommonContext | undefined>(undefined);

CommonContext.displayName = 'CommonContext';

export function CommonContextProvider({ children, data }: { children: ReactNode, data?: any }) {
    return <CommonContext.Provider value={data}>{children}</CommonContext.Provider>;
}

export function useCommonContext() {
    const context = useContext(CommonContext);

    if (context === undefined) {
        throw new Error('useCommonContext need CommonContextProvider');
    }

    return context;
}
