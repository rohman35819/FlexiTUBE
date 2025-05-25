"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar"; // ✅ BENAR


const Dashboard: React.FC = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const handleClickNote1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/notes/note1");
  };

  const handleClickSecureBank = () => {
    router.push("/securebank/login");
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
            right: "20px",
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

        <h1>Dashboard Content</h1>
        <p>Konten utama halaman dashboard di sini.</p>

        <button onClick={handleClickNote1}>Klik Aku</button>
      </main>
    </div>
  );
};

export default Dashboard;
