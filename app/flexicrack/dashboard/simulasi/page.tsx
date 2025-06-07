// app/flexicrack/dashboard/simulasi/page.tsx
import React from 'react';
import Link from 'next/link';

const simulasiList = [
  { id: 'login-basic', name: 'CrackLogin: Basic Login Simulator' },
  { id: 'otp-sim', name: 'OTPBlast: OTP Authentication Simulator' },
  { id: 'captcha-challenge', name: 'CaptchaBreaker: CAPTCHA Challenge' },
  { id: 'bruteforce', name: 'ForceStorm: Brute Force Attack Simulator' },
  { id: 'sql-inject', name: 'SQLPhantom: SQL Injection Simulator' },
];

export default function SimulasiPage() {
  return (
    <section style={{ maxWidth: 800, margin: 'auto' }}>
      <h3>Daftar Simulasi</h3>
      <ul>
        {simulasiList.map(sim => (
          <li key={sim.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/flexicrack/dashboard/simulasi/${sim.id}`}>
              <a style={{ fontWeight: 'bold', color: '#0066cc' }}>{sim.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
