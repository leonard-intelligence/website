import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

export function SectionLoader() {
    return (
        <div className="flex items-center justify-center w-full py-24 min-h-[400px]">
            <DotIcon icon={leonardIcons.loading} size={32} fillColor="currentColor" className="text-muted-foreground animate-spin" />
        </div>
    );
}

