// src/app/dashboard/python-fungsi/page.tsx
// atau: src/pages/dashboard/python-fungsi.tsx (kalau pakai /pages)

import React from "react";
import Link from "next/link";

export default function PythonFungsi() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Fungsi di Python
          </h1>
          <p className="text-sm text-gray-500">
            Ditulis oleh <span className="font-semibold">Petani Kode</span> •
            Diperbarui: <time dateTime="2025-10-19">19 Oktober 2025</time>
          </p>
        </header>

        {/* Konten Utama */}
        <section className="prose max-w-none">
          <p>
            Fungsi adalah <strong>blok kode</strong> yang dirancang untuk
            menjalankan tugas tertentu dan bisa dipanggil berulang kali tanpa
            harus menulis ulang kodenya.
          </p>

          <h2>Apa itu Fungsi?</h2>
          <p>
            Dalam Python, fungsi didefinisikan menggunakan kata kunci{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">def</code>{" "}
            diikuti dengan nama fungsi dan tanda kurung.
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`def sapa():
    print("Halo Dunia!")`}</code>
          </pre>

          <p>
            Untuk menjalankan fungsi, kita cukup memanggil namanya menggunakan
            tanda kurung:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`sapa()`}</code>
          </pre>

          <h2>Fungsi dengan Parameter</h2>
          <p>
            Fungsi bisa menerima data lewat parameter. Contohnya, fungsi{" "}
            <code>sapa</code> berikut menerima satu parameter bernama{" "}
            <code>nama</code>:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`def sapa(nama):
    print(f"Halo, {nama}!")`}</code>
          </pre>

          <p>
            Ketika fungsi dipanggil, kita bisa mengirimkan nilai ke parameter:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`sapa("Rohman")
sapa("Dunia")`}</code>
          </pre>

          <h2>Fungsi dengan Nilai Balik (Return)</h2>
          <p>
            Selain mencetak hasil, fungsi juga bisa <em>mengembalikan</em> nilai
            menggunakan perintah{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">return</code>:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`def tambah(a, b):
    return a + b

hasil = tambah(3, 4)
print(hasil)`}</code>
          </pre>

          <p>Output:</p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
            <code>{`7`}</code>
          </pre>

          <h2>Kesimpulan</h2>
          <ul>
            <li>Fungsi digunakan untuk mengelompokkan kode agar lebih rapi.</li>
            <li>Gunakan <code>def</code> untuk membuat fungsi baru.</li>
            <li>
              Parameter digunakan untuk menerima input, dan{" "}
              <code>return</code> digunakan untuk mengembalikan output.
            </li>
          </ul>
        </section>

        {/* Navigasi Bawah */}
        <footer className="mt-10 border-t pt-6 text-sm text-gray-500">
          <p>Selanjutnya:</p>
          <Link
            href="/dashboard/python-parameter"
            className="text-blue-600 hover:underline"
          >
            ▶ Fungsi dengan Banyak Parameter
          </Link>
        </footer>
      </article>
    </main>
  );
}
