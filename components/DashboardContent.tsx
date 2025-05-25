"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../components/DashboardContent.module.css";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={styles.container}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div
        className={styles.content}
        style={{
          marginLeft: collapsed ? "72px" : "240px",
          width: collapsed ? "calc(100vw - 72px)" : "calc(100vw - 240px)",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <header className={styles.header}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <div className={styles.rightIcons}>
            <button className={styles.iconButton} aria-label="Upload">
              {/* Upload icon svg */}
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 20h14v-2H5v2zm7-18v12l4-4h-3V4h-2z" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="Notifications">
              {/* Bell icon svg */}
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22c1.1 0 1.99-.9 1.99-2H10c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-1.99 2H20l-2-2z" />
              </svg>
            </button>
            <button className={styles.avatarButton} aria-label="User Profile">
              {/* Circle avatar */}
              <div className={styles.avatarCircle}>B</div>
            </button>
          </div>
        </header>
        <main className={styles.mainContent}>
          <h1>Dashboard FlexiTUBE</h1>
          <p>Selamat datang, <b>bani</b>!</p>
          {/* Konten video/trending bisa ditambahkan di sini */}
        </main>
      </div>
    </div>
    

  );
}
