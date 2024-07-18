import React, { forwardRef } from 'react';
import '../assets/styles/components/input.css';

interface IInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      placeholder,
      type = 'text',
      disabled = false,
      className,
      onChange,
      value,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    return (
      <input
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={className}
        onChange={onChange}
        ref={ref}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  },
);
