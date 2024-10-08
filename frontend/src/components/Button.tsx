import React from 'react';

interface IButtonPros {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<IButtonPros> = ({
  type,
  className,
  onClick,
  children,
  disabled,
}: IButtonPros) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
