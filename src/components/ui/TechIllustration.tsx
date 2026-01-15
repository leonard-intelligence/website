import { cn } from "@/lib/utils";
import { useState } from "react";
import { FxImage } from "@/components/fx";
import { useFxConfig } from "@/components/fx/FxContext";

interface TechIllustrationProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g. "aspect-video"
}

export function TechIllustration({ src, alt, className, aspectRatio = "aspect-video" }: TechIllustrationProps) {
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
        // Disable sphere interaction on illustrations by default
        interaction: {
            enabled: false,
            auto: {
                enabled: false,
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
            colorA: hoverConfig.colorA || '#0a0094',
            colorB: hoverConfig.colorB || '#ffffff',
            strength: hoverConfig.strength ?? globalConfig.duotone.strength
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
                className="w-full h-full object-cover"
                config={configOverrides}
            />
        </div>
    );
}
