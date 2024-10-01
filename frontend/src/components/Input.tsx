import React, { forwardRef } from 'react';

interface IInputProps {
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  checked?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name,
      placeholder,
      type = 'text',
      accept,
      disabled = false,
      className,
      onChange,
      value,
      checked,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    return (
      <input
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        accept={accept}
        className={className}
        onChange={onChange}
        ref={ref}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checked}
      />
    );
  },
);
