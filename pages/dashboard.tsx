import { useRouter } from "next/router";
import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleClickNote1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/notes/note1");
  };

  const handleClickSecureBank = () => {
    router.push("/securebank/login");
  };

  return (
    <div>
      <Sidebar />
      <main style={{ marginLeft: "240px", padding: "20px", position: "relative" }}>
        {/* Tombol SecureBank di pojok kanan atas */}
        <button
          onClick={handleClickSecureBank}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "8px 16px",
            backgroundColor: "#2563EB", // biru Tailwind
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
