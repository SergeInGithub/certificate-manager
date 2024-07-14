import React from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/styles/layouts/rootLayout.css';
import { Navbar, Sidebar } from '@components';

export function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />

      <main>
        <Sidebar />
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
