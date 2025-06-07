'use client';

import { useRouter } from 'next/navigation';
import WithAuth from '../lib/withAuth';

export default function NotesPage() {
  const router = useRouter();

  return (
    <WithAuth>
      <div style={{ padding: '1rem' }}>
        <h1>Halaman Notes1 - Hanya untuk pengguna yang sudah login</h1>
        <p>Ini adalah konten rahasia yang harus dilindungi dengan autentikasi.</p>
        <button onClick={() => router.push('/')}>Kembali ke Beranda</button>
      </div>
    </WithAuth>
  );
}
