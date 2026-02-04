import { useEffect } from 'react';

export function CalendlyWidget() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full mt-8 animate-fade-in">
            <div
                className="calendly-inline-widget mx-auto"
                data-url="https://calendly.com/leonard-intelligence"
                style={{ minWidth: '320px', height: '700px' }}
            ></div>
        </div>
    );
}
