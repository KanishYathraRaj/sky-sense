import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen max-w-lg mx-auto bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] transition-colors duration-300">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}