import React from 'react';

interface SelectProps<T> {
  options: T[];
  className?: string;
  placeholder?: string;
  value?: T;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = <T extends string>({
  options,
  className,
  placeholder = 'Select your option',
  value,
  onChange,
}: SelectProps<T>) => (
  <select
    className={className}
    value={value || ''}
    onChange={onChange}
  >
    <option
      value=""
      disabled
    >
      {placeholder}
    </option>
    {options.map((option) => (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    ))}
  </select>
);
