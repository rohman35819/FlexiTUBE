import Link from "next/link";
import clsx from 'clsx';
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
        {collapsed ? "→" : "←"}
      </button>

      <nav className={styles.nav}>
        <ul>
          <li data-tooltip="Notes 1">
            <Link href="/notes1">SQL Injection</Link>
          </li>
           <li data-tooltip="Notes 1">
            <Link href="/notes1">Brute Force</Link>
          </li>
           <li data-tooltip="Notes 1">
            <Link href="/notes1">XSS</Link>
          </li>
          <li data-tooltip="/directory mtraversal">
            <Link href="/directory-traversal">Directory Traversal</Link>
          </li>
          <li data-tooltip="Admin">
            <Link href="/Admin">Admin root</Link>
          </li>
          <li data-tooltip="Analisis">
            <Link href="/Analisis">Analisis Data </Link>
          </li>
          <li data-tooltip="Sidebar 1">
            <Link href="/inisidebar1">Sidebar 1</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
