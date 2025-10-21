// app/python_fungsi/page.tsx
'use client';

import React from 'react';

const PythonFungsiPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Fungsi di Python</h1>
      <p className="text-gray-700 mb-2">
        Fungsi adalah blok kode yang digunakan untuk menjalankan tugas tertentu.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg mt-4 overflow-x-auto">
        {`def sapa(nama):
    print("Halo,", nama)

sapa("Rohman")`}
      </pre>

      <p className="text-gray-700 mt-4">
        Output:
      </p>

      <pre className="bg-gray-800 text-green-400 p-3 rounded">
        {`Halo, Rohman`}
      </pre>
    </div>
  );
};

// ⬇️ Bagian ini WAJIB ada
export default PythonFungsiPage;
