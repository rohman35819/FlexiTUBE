// app/admin/page.tsx (halaman admin tanpa login)

import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Halaman Admin</h1>
      <p className="mb-4">
        Ini adalah halaman khusus admin. Link di bawah ini hanya akan berfungsi jika server Flask di Kali Linux aktif.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="font-semibold">Akses server lokal:</p>
        <a
          href="http://192.168.129.30:5000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          http://192.168.129.30:5000
        </a>
      </div>
    </div>
  );
};

export default AdminPage;
