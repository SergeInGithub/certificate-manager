import React from 'react';
import { useLanguage } from '@hooks';

interface SelectOption<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  options: (T | SelectOption<T>)[];
  className?: string;
  placeholder?: string;
  value?: T;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = <T extends string>({
  options,
  className,
  placeholder,
  value,
  onChange,
}: SelectProps<T>) => {
  const { translations } = useLanguage();

  return (
    <select
      className={className}
      value={value || ''}
      onChange={onChange}
    >
      <option
        value=""
        disabled
      >
        {placeholder || translations.selectPlaceholder}
      </option>

      {options.map((option) =>
        typeof option === 'string' ? (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ) : (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ),
      )}
    </select>
  );
};
