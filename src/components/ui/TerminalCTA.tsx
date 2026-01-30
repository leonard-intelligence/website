


interface TerminalCTAProps {
    primaryAction: {
        text: string;
        href: string;
    };
    secondaryAction: {
        text: string;
        href: string;
    };
}

export function TerminalCTA({ primaryAction, secondaryAction }: TerminalCTAProps) {
    return (
        <div className="w-full max-w-lg mt-8 overflow-hidden rounded-md border border-white/20 bg-black/80 font-mono shadow-xl backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-4 border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                    <span className="text-white border-b border-white px-1">CONTACT</span>
                    <span className="hover:text-white cursor-pointer transition-colors px-1">DEMO</span>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 flex flex-col sm:flex-row gap-4 items-center">
                <span className="hidden sm:inline-block text-accent mr-2">{'>'}</span>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <a
                        href={primaryAction.href}
                        className="flex-1 px-4 py-2 bg-white text-black text-center text-sm font-bold uppercase hover:bg-gray-200 transition-colors rounded-sm"
                    >
                        {primaryAction.text}
                    </a>
                    <a
                        href={secondaryAction.href}
                        className="flex-1 px-4 py-2 bg-transparent text-white border border-white/30 text-center text-sm font-medium uppercase hover:bg-white/10 hover:border-white transition-all rounded-sm"
                    >
                        {secondaryAction.text}
                    </a>
                </div>
            </div>
        </div>
    );
}
