import { cn } from "@/lib/utils";

interface TechIllustrationProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g. "aspect-video"
    config?: Record<string, unknown>; // Allow config overrides (unused now but kept for API compat)
}

export function TechIllustration({ src, alt, className, aspectRatio = "aspect-video" }: TechIllustrationProps) {
    return (
        <div className={cn("relative overflow-hidden group", aspectRatio, className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
