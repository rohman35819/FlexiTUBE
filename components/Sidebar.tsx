import React from "react";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.toggleBtn}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? (
          <span className={styles.arrow}>→</span> // Panah muncul kalau collapsed
        ) : (
          <span className={styles.flexitubeLabel}>FlexiTUBE</span> // Flexitube muncul kalau open
        )}
      </button>

      <nav className={styles.nav}>
        <ul>
          <li data-tooltip="SQL Injection">
            <a href="/notes1">SQL Injection</a>
          </li>
          <li data-tooltip="Brute Force">
            <a href="/notes1">Brute Force</a>
          </li>
          <li data-tooltip="XSS">
            <a href="/notes1">XSS</a>
          </li>
          <li data-tooltip="Directory Traversal">
            <a href="/directory-traversal">Directory Traversal</a>
          </li>
          <li data-tooltip="Admin root">
            <a href="/Admin">Admin root</a>
          </li>
          <li data-tooltip="Analisis Data">
            <a href="/Analisis">Analisis Data</a>
          </li>
          <li data-tooltip="Sidebar 1">
            <a href="/inisidebar1">Sidebar 1</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
