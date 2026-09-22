'use client';

import React, { useCallback, useState } from 'react';

export type VintageButtonVariant = 'default' | 'primary';

export interface VintageButtonProps {
  label: string;
  onClick: () => void;
  active?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
  variant?: VintageButtonVariant;
  direction?: 'horizontal' | 'vertical';
}

export default function VintageButton({
  label,
  onClick,
  active = false,
  icon,
  ariaLabel,
  variant = 'default',
  direction = 'vertical',
}: VintageButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = useCallback(() => setPressed(true), []);
  const handleMouseUp = useCallback(() => setPressed(false), []);
  const handleMouseLeave = useCallback(() => setPressed(false), []);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPressed(true);
    },
    []
  );
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPressed(false);
      onClick();
    },
    [onClick]
  );

  const isDepressed = pressed || active;
  const layout = direction === 'vertical' ? 'w-full justify-start' : 'justify-center';

  const baseDefault =
    'text-[#0f172a] ' +
    'bg-white ' +
    'hover:bg-[#f1f5f9] ' +
    'active:bg-[#e2e8f0] ' +
    'border-[#cbd5e1] ' +
    'hover:border-[#94a3b8] ';

  const basePrimary =
    'text-white ' +
    'bg-[#0b3d91] ' +
    'hover:bg-[#174ea6] ' +
    'active:bg-[#092f70] ' +
    'border-[#092f70] ' +
    'hover:border-[#0b3d91] ';

  const activeDefault =
    'bg-[#0b3d91]/[0.06] ' +
    'border-[#0b3d91]/50 ' +
    'text-[#092f70] ' +
    'hover:bg-[#0b3d91]/[0.1] ';

  const activePrimary =
    'bg-[#092f70] ' +
    'border-[#052152] ' +
    'text-white ' +
    'hover:bg-[#0a2a62] ';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={ariaLabel ?? label}
      aria-pressed={active}
      className={`
        vintage-btn
        relative
        inline-flex
        items-center
        gap-2.5
        min-h-[44px]
        px-3
        sm:px-3.5
        py-2.5
        rounded-lg
        font-sans
        font-semibold
        text-[13px]
        sm:text-[14px]
        leading-snug
        select-none
        touch-manipulation
        transition-all
        duration-[110ms]
        ease-out
        border
        shadow-[0_1px_0_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.06)]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-[#0b3d91]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#eef2f7]
        ${layout}
        ${variant === 'primary' ? basePrimary : baseDefault}
        ${
          active
            ? variant === 'primary'
              ? activePrimary
              : activeDefault
            : ''
        }
        ${
          isDepressed
            ? 'translate-y-[1px] shadow-[inset_0_1px_2px_rgba(15,23,42,0.1),0_0_0_rgba(0,0,0,0)] brightness-[0.99]'
            : 'translate-y-0 hover:shadow-[0_2px_4px_rgba(15,23,42,0.08),0_1px_0_rgba(15,23,42,0.06)]'
        }
        ${active ? 'ring-1 ring-[#0b3d91]/30 ring-offset-0' : ''}
      `}
    >
      {icon ? (
        <span
          className={`
            w-[18px]
            h-[18px]
            sm:w-5
            sm:h-5
            shrink-0
            flex
            items-center
            justify-center
            transition-transform
            duration-[100ms]
            ${isDepressed ? 'scale-[0.97]' : 'scale-100'}
          `}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <span className="truncate text-left flex-1 min-w-0">{label}</span>
      {active && direction === 'vertical' ? (
        <span
          aria-hidden="true"
          className={`
            shrink-0
            ml-1
            w-1.5
            h-1.5
            rounded-full
            ${
              variant === 'primary'
                ? 'bg-white/80'
                : 'bg-[#0b3d91]'
            }
          `}
        />
      ) : null}
    </button>
  );
}
