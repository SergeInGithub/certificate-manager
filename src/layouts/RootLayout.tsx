import React from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/styles/layouts/rootLayout.css';

export function RootLayout() {
  return (
    <div className="root-layout">
      <main className="root-main">
        <Outlet />
      </main>
    </div>
  );
}
