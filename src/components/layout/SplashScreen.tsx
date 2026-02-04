import { useState, useEffect } from 'react';
import { FxImage } from '../fx/FxImage';
import { useFxConfig } from '../fx/FxContext';

interface SplashScreenProps {
    onExitStart: () => void;
    onComplete: () => void;
}

export function SplashScreen({ onExitStart, onComplete }: SplashScreenProps) {
    const config = useFxConfig();
    const [phase, setPhase] = useState<'visible' | 'exiting' | 'done'>('visible');

    useEffect(() => {
        // Phase 1: Show logo for 1.5s
        const showTimer = setTimeout(() => {
            setPhase('exiting');
            onExitStart(); // Reveal site now
        }, 1500);

        // Phase 2: Exit animation takes 1s, then mark done
        const exitTimer = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
        };
    }, [onExitStart, onComplete]);

    if (phase === 'done') return null;

    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center pointer-events-none transition-colors duration-700 ${phase === 'exiting' ? 'bg-transparent' : 'bg-black'
                }`}
        >
            <div
                className={`w-[60%] max-w-[300px] aspect-square ${phase === 'visible' ? 'animate-fade-in' : 'animate-hero-exit'
                    }`}
            >
                <FxImage
                    src="/assets/logos/leonard-logo-white.png"
                    alt="Leonard Intelligence"
                    className="w-full h-full"
                    style={{ width: '100%', height: '100%' }}
                    imgStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center center'
                    }}
                    config={config || {
                        fitMode: 'contain',
                        duotone: { enabled: true, colorA: '#000000', colorB: '#ffffff', strength: 1 },
                        interaction: { enabled: true, mode: 'shape', variant: 'push', radius: 0.15, softness: 0.5, activeSize: 15 }
                    }}
                />
            </div>
        </div>
    );
}
