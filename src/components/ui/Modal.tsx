import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    fullScreen?: boolean;
    persist?: boolean;
}

export function Modal({ isOpen, onClose, children, fullScreen = false, persist = false }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen && !persist) return null;

    // If persist is true but not open, we render hidden
    const isVisible = isOpen;

    return createPortal(
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-300 ${fullScreen ? '' : 'p-4 sm:p-6'} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!isVisible}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                className={`relative bg-black border border-white/10 shadow-2xl overflow-y-auto animate-in fade-in zoom-in-95 duration-200 ${fullScreen
                    ? 'fixed inset-0 w-full h-full rounded-none'
                    : 'w-full max-w-4xl max-h-[90vh] rounded-xl'
                    } ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                role="dialog"
                aria-modal="true"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded-full cursor-pointer"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={fullScreen ? 'h-full w-full' : 'p-1'}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
