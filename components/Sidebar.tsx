import Link from "next/link";
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
          <li>
            <Link href="/notes1">Notes 1</Link>
          </li>
          <li>
            <Link href="/Admin">Admin</Link>
          </li>
          <li>
            <Link href="/notes/note3">Notes 3</Link>
          </li>
          <li>
            <Link href="/inisidebar1">sidebar 1</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
