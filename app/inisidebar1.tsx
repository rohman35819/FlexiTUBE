import React from 'react';
import Link from 'next/link';




import "./globals.css"; // pastikan import CSS global (biasanya di layout, ini optional)

const Inisidebar1Page = () => {
  return (
    <main className="page-container">
      <section className="page-card">
        <h1 className="page-title">Halaman Ini Sidebar 1</h1>
        <p className="page-text">
          Ini adalah halaman sidebar 1 tanpa login.
          <br />
          Desain halaman ini menggunakan efek 3D ringan, kombinasi gradient,
          shadow, dan animasi hover yang membuat tampilan modern dan interaktif.
        </p>
        <button
          className="page-button"
          onClick={() => alert("Tombol ditekan!")}
        >
          Klik Saya
        </button>
      </section>
    </main>
  );
};

export default Inisidebar1Page;
