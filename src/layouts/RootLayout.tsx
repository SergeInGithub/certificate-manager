import React from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/styles/layouts/rootLayout.css';
import { Navbar } from '@components';

export function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <main className="root-main">
        <Outlet />
      </main>
    </div>
  );
}
