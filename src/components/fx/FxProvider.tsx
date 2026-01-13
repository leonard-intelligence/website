import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { FxContext } from './FxContext';
import { FX_DEFAULTS, type FxConfig } from './fxConfig';

interface FxProviderProps {
    children: ReactNode;
    initialConfig?: Partial<FxConfig>;
}

/**
 * Provider component - wrap your app with this
 */
export function FxProvider({ children, initialConfig }: FxProviderProps) {
    const [config, setConfigState] = useState<FxConfig>({
        ...FX_DEFAULTS,
        ...initialConfig,
        beads: { ...FX_DEFAULTS.beads, ...initialConfig?.beads },
        duotone: { ...FX_DEFAULTS.duotone, ...initialConfig?.duotone },
        hover: { ...FX_DEFAULTS.hover, ...initialConfig?.hover },
        interaction: { ...FX_DEFAULTS.interaction, ...initialConfig?.interaction },
    });

    const setConfig = useCallback((newConfig: FxConfig) => {
        setConfigState(newConfig);
    }, []);

    const updateConfig = useCallback((updates: Partial<FxConfig>) => {
        setConfigState(prev => ({
            ...prev,
            ...updates,
            beads: { ...prev.beads, ...updates.beads },
            duotone: { ...prev.duotone, ...updates.duotone },
            hover: { ...prev.hover, ...updates.hover },
            interaction: { ...prev.interaction, ...updates.interaction },
        }));
    }, []);

    return (
        <FxContext.Provider value={{ config, setConfig, updateConfig }}>
            {children}
        </FxContext.Provider>
    );
}
