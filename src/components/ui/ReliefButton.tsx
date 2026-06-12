import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './ReliefButton.module.css';

export type ReliefTone =
    | 'dark'
    | 'light'
    | 'lime'
    | 'gold'
    | 'frost'
    | 'ghost';
export type ReliefSize = 'sm' | 'md' | 'lg';
/** Forces a visual state for galleries/specimens (no interaction needed). */
export type ReliefForceState = 'hover' | 'active' | 'focus' | 'disabled';

interface ReliefBaseProps {
    tone?: ReliefTone;
    size?: ReliefSize;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    /** Square padding, icon only (pass the icon as iconLeft or children). */
    iconOnly?: boolean;
    /** Full width. */
    block?: boolean;
    /** Pin a visual state — for the specimen page only. */
    forceState?: ReliefForceState;
    children?: React.ReactNode;
}

type ReliefButtonElementProps = ReliefBaseProps &
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ReliefBaseProps> & {
        href?: undefined;
    };

type ReliefAnchorElementProps = ReliefBaseProps &
    Omit<React.ComponentPropsWithoutRef<'a'>, keyof ReliefBaseProps> & {
        /** When set, the button renders as an anchor (navigation CTA). */
        href: string;
    };

export type ReliefButtonProps = ReliefButtonElementProps | ReliefAnchorElementProps;

export function ReliefButton(props: ReliefButtonProps) {
    const {
        tone = 'dark',
        size = 'md',
        iconLeft,
        iconRight,
        iconOnly = false,
        block = false,
        forceState,
        className,
        children,
        ...rest
    } = props;

    const classes = cn(
        styles.btn,
        styles[tone],
        styles[size],
        block && styles.block,
        iconOnly && styles.iconOnly,
        forceState === 'hover' && styles.isHover,
        forceState === 'active' && styles.isActive,
        forceState === 'focus' && styles.isFocus,
        forceState === 'disabled' && styles.isDisabled,
        className
    );

    const content = (
        <>
            {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
            {children != null && <span className={styles.label}>{children}</span>}
            {iconRight && <span className={styles.icon}>{iconRight}</span>}
        </>
    );

    // Navigation CTA — render an anchor so links keep correct semantics.
    if ('href' in props && props.href != null) {
        const isDisabled = forceState === 'disabled';
        const anchorRest = rest as Omit<ReliefAnchorElementProps, keyof ReliefBaseProps>;
        return (
            <a
                data-tone={tone}
                data-size={size}
                aria-disabled={isDisabled || undefined}
                className={classes}
                {...anchorRest}
                href={isDisabled ? undefined : props.href}
            >
                {content}
            </a>
        );
    }

    const { type = 'button', disabled, ...buttonRest } =
        rest as Omit<ReliefButtonElementProps, keyof ReliefBaseProps>;
    return (
        <button
            type={type}
            data-tone={tone}
            data-size={size}
            disabled={disabled || forceState === 'disabled'}
            className={classes}
            {...buttonRest}
        >
            {content}
        </button>
    );
}

export default ReliefButton;
