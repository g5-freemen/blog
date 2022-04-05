import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

export type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  value?: number | string;
  id?: string;
  readOnly?: boolean;
  ariaLabel?: string;
  name?: string;
};

export const Input = (props: InputProps) => {
  const {
    onChange,
    onKeyPress,
    autoFocus,
    disabled,
    type,
    placeholder,
    value,
    id,
    readOnly,
    ariaLabel,
    name,
  } = props;

  return (
    <input
      className={styles.input}
      aria-label={ariaLabel}
      readOnly={readOnly}
      onKeyPress={onKeyPress}
      onChange={onChange}
      autoFocus={autoFocus}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      id={id}
    />
  );
};
