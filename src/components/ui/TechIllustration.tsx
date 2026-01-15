import { cn } from "@/lib/utils";
import { useState } from "react";
import { FxImage } from "@/components/fx";
import { useFxConfig } from "@/components/fx/FxContext";

interface TechIllustrationProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g. "aspect-video"
    config?: Record<string, unknown>; // Allow config overrides
}

export function TechIllustration({ src, alt, className, aspectRatio = "aspect-video", config }: TechIllustrationProps) {
    const [isHovered, setIsHovered] = useState(false);
    const globalConfig = useFxConfig();

    // Determine target shape: Flip global shape on hover
    const globalShape = globalConfig.beads.shape; // 'circle' | 'square'
    const hoverShape = globalShape === 'square' ? 'circle' : 'square';
    const currentShape = isHovered ? hoverShape : globalShape;

    // Determine interaction config


    // Construct config overrides
    const configOverrides: Record<string, unknown> = {
        enabled: true, // Force enable FX
        // Enable sphere interaction (beads) but disable auto-animation (shaders)
        interaction: {
            enabled: true,
            auto: {
                enabled: false,
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
        },
        ...config // Merge passed config last
    };

    // Apply Hover Duotone Override (Blue)
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
            className={cn("relative overflow-hidden group", aspectRatio, className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FxImage
                src={src}
                alt={alt}
                className="w-full h-full"
                imgStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
                config={configOverrides}
            />
        </div>
    );
}
