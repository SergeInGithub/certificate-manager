import { CERTIFICATE_TYPE } from '@types';
import React from 'react';

interface SelectProps {
  options: typeof CERTIFICATE_TYPE;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  className,
  placeholder,
  value,
  onChange,
}: SelectProps) => (
  <select
    className={className}
    value={value}
    onChange={onChange}
  >
    <option
      value=""
      disabled
    >
      {placeholder}
    </option>
    {Object.values(options).map((option) => (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    ))}
  </select>
);
