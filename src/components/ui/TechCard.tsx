import { cn } from "@/lib/utils";
import React from "react";
import { FxImage } from "@/components/fx";
import styles from "./TechCard.module.css";
import { useFxConfig } from "@/components/fx/FxContext";
import { useState } from "react";

interface TechCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

// Simplified TechCard relying on CSS Module
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TechCard({ children, className, ...props }: TechCardProps & { showMarkers?: boolean }) {
    // Determine if showMarkers is passed (even if unused by CSS module now, we strip it)
    const { showMarkers, ...domProps } = props as any;

    return (
        <div
            className={cn(
                styles.card,
                className
            )}
            {...domProps}
        >
            {children}
        </div>
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
    const [isHovered, setIsHovered] = useState(false);
    const globalConfig = useFxConfig();

    // Determine target shape: Flip global shape on hover
    const globalShape = globalConfig.beads.shape; // 'circle' | 'square'
    const hoverShape = globalShape === 'square' ? 'circle' : 'square';
    const currentShape = isHovered ? hoverShape : globalShape;

    // Determine interaction config
    const hoverConfig = globalConfig.hover;

    // Construct config overrides
    const configOverrides: Record<string, unknown> = {
        // Disable sphere interaction on cards
        interaction: {
            enabled: false,
            auto: {
                enabled: false,
                type: 'wave',
                speed: 0,
                strength: 0,
                scale: 0
            }
        },
        // Swap shape on hover
        beads: {
            shape: currentShape
        }
    };

    // Apply Hover Duotone Override if enabled
    if (isHovered && hoverConfig.duotoneEnabled) {
        configOverrides.duotone = {
            enabled: true,
            colorA: hoverConfig.colorA || '#ff0000',
            colorB: hoverConfig.colorB || '#ffff00',
            strength: hoverConfig.strength ?? globalConfig.duotone.strength
        };
    }

    return (
        <div
            className={cn(styles.imageWrapper, layout === 'full' && styles.imageWrapperFull, className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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

