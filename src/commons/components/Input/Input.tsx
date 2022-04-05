import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

export type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  value?: number | string;
  id?: string;
  readOnly?: boolean;
  name?: string;
};

export function Input(props: InputProps) {
  const {
    onChange,
    onKeyPress,
    disabled,
    type,
    placeholder,
    value,
    id,
    readOnly,
    name,
  } = props;

  return (
    <input
      className={styles.input}
      readOnly={readOnly}
      onKeyPress={onKeyPress}
      onChange={onChange}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      id={id}
    />
  );
}

Input.defaultProps = {
  disabled: false,
  readOnly: false,
};
