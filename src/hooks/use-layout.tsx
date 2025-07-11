
"use client";

import React, { createContext, useContext, useState, useMemo, Dispatch, SetStateAction } from 'react';

type LayoutState = {
    showCookiePolicy: boolean;
};

type LayoutContextType = {
    layoutState: LayoutState;
    setLayoutState: Dispatch<SetStateAction<LayoutState>>;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [layoutState, setLayoutState] = useState<LayoutState>({
        showCookiePolicy: false,
    });

    const value = useMemo(() => ({ layoutState, setLayoutState }), [layoutState]);

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
