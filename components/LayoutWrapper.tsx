'use client';

import React from 'react';

type LayoutWrapperProps = {
  collapsed?: boolean;
  children: React.ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ collapsed = false, children }) => {
  const marginLeft = collapsed ? '60px' : '240px';

  return (
    <main
      style={{
        marginLeft,
        transition: 'margin-left 0.3s ease',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        minHeight: '90vh',
        marginTop: '24px',
        marginBottom: '24px',
      }}
    >
      {children}
    </main>
  );
};

export default LayoutWrapper;
