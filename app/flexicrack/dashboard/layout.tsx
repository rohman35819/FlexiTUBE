// app/flexicrack/dashboard/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/flexicrack/dashboard', label: '🏠 Beranda Dashboard' },
    { href: '/flexicrack/dashboard/simulasi', label: '🧪 Simulasi Pentest' },
  ];

  return (
    <>
      <header style={{ padding: '1rem', backgroundColor: '#004466', color: 'white' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? 'yellow' : 'white',
                fontWeight: pathname === link.href ? 'bold' : 'normal',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main style={{ padding: '1.5rem' }}>{children}</main>
    </>
  );
}
