import { cn } from "@/lib/utils";

interface DeploymentIconProps {
    src: string;
    alt: string;
    className?: string;
}

export function DeploymentIcon({ src, alt, className }: DeploymentIconProps) {
    return (
        <div className={cn("relative overflow-hidden bg-black h-full w-full", className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover block align-bottom"
            />
        </div>
    );
}
