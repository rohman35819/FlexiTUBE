'use client';
import React from 'react';

type LayoutWrapperProps = {
  collapsed?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ collapsed = false, children, footer }) => {
  const marginLeft = collapsed ? '60px' : '240px';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginLeft,
        transition: 'margin-left 0.3s ease',
      }}
    >
      <main
        style={{
          flex: 1,
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          marginTop: '24px',
        }}
      >
        {children}
      </main>

      {footer && (
        <footer
          style={{
            marginTop: 'auto',
            padding: '12px 24px',
            background: '#f3f3f3',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'row', // penting: horizontal
            justifyContent: 'space-between', // kiri-kanan
            alignItems: 'center', // rata tengah vertikal
            flexWrap: 'wrap', // supaya responsif
            gap: '16px', // jarak antar elemen
          }}
        >
          {footer}
        </footer>
      )}
    </div>
  );
};

export default LayoutWrapper;
