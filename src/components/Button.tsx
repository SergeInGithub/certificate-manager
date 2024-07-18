import React from 'react';

interface IButtonPros {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: string;
}

export const Button: React.FC<IButtonPros> = ({
  type,
  className,
  onClick,
  children,
}: IButtonPros) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
