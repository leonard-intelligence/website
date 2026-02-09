import { useEffect } from 'react';

interface CalendlyWidgetProps {
    className?: string;
    style?: React.CSSProperties;
    url?: string;
    /** When true, the Calendly script is loaded. When false, nothing loads. */
    active?: boolean;
}

export function CalendlyWidget({ className, style, url = "https://calendly.com/leonard-intelligence", active = true }: CalendlyWidgetProps) {
    useEffect(() => {
        // Only load the Calendly script when the widget is active (modal is open)
        if (!active) return;

        // Inject preconnect hints just-in-time (instead of static <link> in index.html)
        const origins = ['https://assets.calendly.com', 'https://calendly.com'];
        origins.forEach(origin => {
            if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = origin;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });

        // Load Calendly script
        const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
        if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
    }, [active]);

    return (
        <div className={`w-full ${className || 'mt-8 animate-fade-in'}`}>
            <div
                className="calendly-inline-widget mx-auto"
                data-url={url}
                style={style || { minWidth: '320px', height: '550px' }}
            ></div>
        </div>
    );
}
