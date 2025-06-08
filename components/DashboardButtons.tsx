// components/DashboardButtons.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';

const DashboardButtons: React.FC = () => {
  const router = useRouter();

  const handleClickNote1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/notes/note1");
  };

  const handleClickSecureBank = () => {
    router.push("/securebank/login");
  };

  const handleClickFlexiCrack = () => {
    router.push("/flexicrack");
  };

  return (
    <>
      <button
        onClick={handleClickSecureBank}
        style={{
          position: "absolute",
          top: "20px",
          right: "0px",
          padding: "8px 16px",
          backgroundColor: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        SecureBank
      </button>

      <button
        onClick={handleClickFlexiCrack}
        style={{
          position: "absolute",
          top: "20px",
          right: "100px",
          padding: "8px 16px",
          backgroundColor: "#DC2626",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <FaBug /> FlexiCrack
      </button>

      <button
        onClick={handleClickNote1}
        style={{
          marginTop: "80px",
          padding: "10px 20px",
          backgroundColor: "#10B981",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Klik Aku
      </button>
    </>
  );
};

export default DashboardButtons;
