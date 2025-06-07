// app/flexicrack/layout.tsx
'use client';

import Link from "next/link";
import React from "react";


export default function FlexiCrackLayout({ children }: { children: React.ReactNode }) {
  return (

    
    <>
      <style>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
        }
        #__next {
          display: flex;
          flex-direction: column;
        }
        header {
          padding: 1rem;
          background-color: #222;
          color: white;
        }
        main {
          flex: 1; /* bikin main flexible agar memenuhi ruang */
          padding: 2rem;
        }
        footer {
          text-align: center;
          padding: 1rem;
          background-color: #222;
          color: #aaa;
        }
      `}</style>

      <header>
        <nav>
          <Link href="/dashboard">Home</Link> |{" "}
          <Link href="/something">ulin</Link>
        </nav>
      </header>

       <main>
        {children}
      </main>

      <footer>
        © 2025 FlexiCrack - Simulasi Pentest Login
      </footer>
    </>
  );
}
