import { createContext, useContext } from "react";

// Context to share hover state
interface TechCardContextType {
    isHovered: boolean;
}

export const TechCardContext = createContext<TechCardContextType | undefined>(undefined);

export const useTechCardContext = () => {
    const context = useContext(TechCardContext);
    if (!context) {
        // Fallback for standalone usage if needed, or throw error
        return { isHovered: false };
    }
    return context;
};
