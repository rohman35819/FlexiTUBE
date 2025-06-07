'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    // Tambahkan logika logout di sini jika diperlukan
    router.push("/dashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{
        width: "200px",
        background: "#1E3A8A",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>SecureBank</h2>
          <nav>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/securebank/dashboard/saldo" style={{ color: isActive("/securebank/dashboard/saldo") ? "#FACC15" : "white" }}>
                  Saldo
                </Link>
              </li>
              <li>
                <Link href="/securebank/dashboard/transfer" style={{ color: isActive("/securebank/dashboard/transfer") ? "#FACC15" : "white" }}>
                  Transfer
                </Link>
              </li>
              <li>
                <Link href="/securebank/dashboard/pengaturan" style={{ color: isActive("/securebank/dashboard/pengaturan") ? "#FACC15" : "white" }}>
                  Pengaturan
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#DC2626",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Keluar
        </button>
      </aside>

      <main style={{ padding: "20px", flex: 1 }}>{children}</main>
    </div>
  );
}
