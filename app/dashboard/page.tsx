'use client';

import { useRouter } from 'next/navigation'; // untuk app router, gunakan next/navigation, bukan next/router
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaBug } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleClickNote1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/notes/note1");
  };

  const handleClickSecureBank = () => {
    router.push("/securebank/login");
  };

  const handleClickFlexiCrack = () => {
    router.push("/flexicrack"); // sesuaikan path FlexiCrack kamu
  };

  return (
    <div>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main
        style={{
          marginLeft: collapsed ? "72px" : "240px",
          padding: "20px",
          position: "relative",
          transition: "margin-left 0.3s ease",
        }}
      >
        <button
          onClick={handleClickSecureBank}
          style={{
            position: "absolute",
            top: "20px",
            right: "0px", // geser sedikit biar tombol nggak overlap
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

        <h1>Dashboard Content</h1>
        <p>Konten utama halaman dashboard di sini.</p>

        <button onClick={handleClickNote1}>Klik Aku</button>
      </main>
    </div>
  );
};

export default Dashboard;
