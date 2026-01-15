import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";
import { FxImage } from "@/components/fx";
import styles from "./TechCard.module.css";
import { useFxConfig } from "@/components/fx/FxContext";

// Context to share hover state
interface TechCardContextType {
    isHovered: boolean;
}

const TechCardContext = createContext<TechCardContextType | undefined>(undefined);

export const useTechCardContext = () => {
    const context = useContext(TechCardContext);
    if (!context) {
        // Fallback for standalone usage if needed, or throw error
        return { isHovered: false };
    }
    return context;
};

interface TechCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

// Simplified TechCard relying on CSS Module
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TechCard({ children, className, ...props }: TechCardProps & { showMarkers?: boolean }) {
    // Determine if showMarkers is passed (even if unused by CSS module now, we strip it)
    const { showMarkers, ...domProps } = props as any;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TechCardContext.Provider value={{ isHovered }}>
            <div
                className={cn(
                    styles.card,
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...domProps}
            >
                {children}
            </div>
        </TechCardContext.Provider>
    );
}

interface TechCardImageProps {
    src: string;
    alt: string;
    className?: string;
    useFx?: boolean; // Enable FX effects
    layout?: 'contained' | 'full';
}

// Image Wrapper with optional FX effects
export const TechCardImage = ({ src, alt, className, useFx = true, layout = 'contained' }: TechCardImageProps) => {
    // Use context instead of local state
    const { isHovered } = useTechCardContext();
    const globalConfig = useFxConfig();

    // Determine target shape: Flip global shape on hover
    const globalShape = globalConfig.beads.shape; // 'circle' | 'square'
    const hoverShape = globalShape === 'square' ? 'circle' : 'square';
    const currentShape = isHovered ? hoverShape : globalShape;

    // Determine interaction config


    // Construct config overrides
    const configOverrides: Record<string, unknown> = {
        enabled: true, // Force enable FX
        // Enable sphere interaction on cards default
        interaction: {
            enabled: true,
            auto: {
                enabled: false, // Don't auto-animate small cards
            }
        },
        // Swap shape on hover
        beads: {
            shape: currentShape
        },
        // Default to Black & White Duotone
        duotone: {
            enabled: true,
            colorA: '#000000',
            colorB: '#ffffff',
            strength: 1.0
        }
    };

    // Apply Hover Duotone Override
    if (isHovered) {
        configOverrides.duotone = {
            enabled: true,
            colorA: '#0a0094', // Blue
            colorB: '#ffffff', // White
            strength: 1.0
        };
    }

    return (
        <div
            className={cn(styles.imageWrapper, layout === 'full' && styles.imageWrapperFull, className)}
        // Local handlers removed, rely on parent context
        >
            {useFx ? (
                <FxImage
                    src={src}
                    alt={alt}
                    className={styles.image} // Using module class
                    imgStyle={layout === 'full' ? { objectFit: 'cover', width: '100%', height: '100%' } : undefined}
                    config={configOverrides}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={styles.image}
                />
            )}
        </div>
    );
};

