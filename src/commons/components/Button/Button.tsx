import React, { MouseEvent } from 'react';

export type ButtonProps = {
  children?: React.ReactNode;
  id?: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};

export function Button({
  children,
  disabled,
  type,
  onClick,
  onKeyPress,
  id,
  className,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onKeyPress}
      className={className}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
};
