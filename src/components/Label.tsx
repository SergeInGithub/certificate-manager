import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
    >
      {children}
    </label>
  );
};
