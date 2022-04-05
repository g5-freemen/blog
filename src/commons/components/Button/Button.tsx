import React, { MouseEvent } from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  id?: string;
  type: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

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
      // eslint-disable-next-line react/button-has-type
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
  disabled: false,
};
