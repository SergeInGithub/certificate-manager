import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/styles/layouts/rootLayout.css';
import { Navbar, Sidebar } from '@components';

export function RootLayout() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 834,
  );
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 834);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window]);

  return (
    <div className="root-layout">
      <Navbar />

      <main>
        <Sidebar />
        <div className={`${isLargeScreen ? 'outlet' : 'smOutlet'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
