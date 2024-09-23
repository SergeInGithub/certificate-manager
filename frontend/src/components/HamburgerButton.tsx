import React from 'react';
import '../assets/styles/components/hamburgerButton.css';

type IButtonProps = {
  isSidebarOpen: boolean;
  handleSidebarOpen: () => void;
};

export const HamburgerButton: React.FC<IButtonProps> = ({
  isSidebarOpen,
  handleSidebarOpen,
}: IButtonProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sidebar-button"
      aria-expanded={isSidebarOpen}
      onClick={handleSidebarOpen}
    >
      <path
        d="M4 7L7 7M20 7L11 7"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M20 17H17M4 17L13 17"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M4 12H7L20 12"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
