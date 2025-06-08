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
        padding: '20px',
        position: 'relative',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        backgroundColor: '#F9FAFB' // sama seperti Tailwind bg-gray-50
      }}
    >
      {children}
    </main>
  );
};

export default LayoutWrapper;
