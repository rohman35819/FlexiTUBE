// app/flexicrack/dashboard/page.tsx
'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <section style={{ maxWidth: 700, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯 FlexiCrack Dashboard</h1>
      
      <p style={{ marginBottom: '1rem' }}>
        Selamat datang di <strong>FlexiCrack</strong> — platform latihan simulasi keamanan login dan OTP.
        Cocok buat kamu yang ingin belajar <em>penetration testing</em> secara aman dan interaktif.
      </p>

      <p style={{ marginBottom: '2rem' }}>
        Pilih salah satu simulasi di bawah ini untuk memulai:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
        <li>
          <Link href="/flexicrack/dashboard/simulasi/authentication-with-next-js-typescript" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            🔐 authentication-with-next-js-typescript — Simulasi login sederhana dengan validasi form
          </Link>
        </li>
        <li>
          <Link href="/flexicrack/dashboard/simulasi/login-captcha" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            🧠 Login Captcha — Tantangan login dengan CAPTCHA
          </Link>
        </li>
        <li>
          <Link href="/flexicrack/dashboard/simulasi/otp-attack" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            📲 OTP Attack — Coba retas sistem OTP tiruan
          </Link>
        </li>
        {/* Tambahkan simulasi lain di sini */}
      </ul>
    </section>
  );
}
