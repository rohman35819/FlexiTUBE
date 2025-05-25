import Link from "next/link";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.toggleBtn}
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? "→" : "←"}
      </button>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/notes/note1">Notes 1</Link>
          </li>
          <li>
            <Link href="/notes/note2">Notes 2</Link>
          </li>
          <li>
            <Link href="/notes/note3">Notes 3</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
