/**
 * FxContext - Global state for FX configuration
 * Allows FxDebugPanel to control FxImage effects in real-time
 */

import { createContext, useContext } from 'react';
import type { FxConfig } from './fxConfig';
import { FX_DEFAULTS } from './fxConfig';

interface FxContextValue {
    config: FxConfig;
    setConfig: (config: FxConfig) => void;
    updateConfig: (updates: Partial<FxConfig>) => void;
    mouseRef: React.MutableRefObject<{ x: number, y: number }>;
}

export const FxContext = createContext<FxContextValue | null>(null);


/**
 * Hook for FxImage - read-only access to config
 */
export function useFxConfig(): FxConfig {
    const context = useContext(FxContext);
    // Return defaults if used outside provider (graceful degradation)
    return context?.config ?? FX_DEFAULTS;
}

/**
 * Hook for FxDebugPanel - full access to update config
 */
export function useFxDebug() {
    const context = useContext(FxContext);
    if (!context) {
        // Return no-op functions if used outside provider
        return {
            config: FX_DEFAULTS,
            setConfig: () => { },
            updateConfig: () => { },
            mouseRef: { current: { x: 0, y: 0 } },
        };
    }
    return context;
}
