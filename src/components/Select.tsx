import React from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
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
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
      >
        {option.label}
      </option>
    ))}
  </select>
);
