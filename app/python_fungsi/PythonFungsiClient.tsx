"use client"; // 🟢 Tambahkan ini di baris pertama

import Link from "next/link";
import React from "react";
import Sidebar from "@/components/Sidebar";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Fungsi di Python — FlexiTUBE",
  description: "Pengantar lengkap: apa itu fungsi di Python, parameter, return, contoh, dan best practice.",
};

export default function PythonFungsiPage() {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Konten utama */}
      <LayoutWrapper collapsed={collapsed}>
        <article className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
          {/* Header */}
          <header className="mb-6">
            <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
              ← Kembali ke Dashboard
            </Link>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">Fungsi di Python</h1>

            <div className="mt-3 text-sm text-gray-500">
              Ditulis oleh <span className="font-medium">Rohman</span> •
              <time dateTime="2025-10-19" className="ml-1">
                19 Oktober 2025
              </time>
            </div>
          </header>

          {/* Isi Artikel */}
          <section className="prose prose-lg max-w-none mb-6">
            <p>
              Fungsi adalah blok kode yang dapat dipanggil berulang kali untuk melakukan tugas tertentu.
              Menggunakan fungsi membuat kode menjadi lebih modular, mudah dibaca, dan teruji.
            </p>

            <nav className="my-4 p-4 bg-gray-50 rounded">
              <strong>Isi artikel</strong>
              <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                <li><a href="#apa-fungsi">Apa itu fungsi?</a></li>
                <li><a href="#membuat-fungsi">Membuat fungsi sederhana</a></li>
                <li><a href="#parameter-dan-argumen">Parameter & Argumen</a></li>
                <li><a href="#return">Return (mengembalikan nilai)</a></li>
                <li><a href="#best-practices">Best practices</a></li>
              </ul>
            </nav>

            <h2 id="apa-fungsi">Apa itu fungsi?</h2>
            <p>
              Fungsi adalah cara mengelompokkan baris kode yang melakukan tugas tertentu, sehingga cukup dipanggil berkali-kali
              tanpa menulis ulang logikanya.
            </p>

            <h2 id="membuat-fungsi">Membuat fungsi sederhana</h2>
            <p>Gunakan kata kunci <code>def</code> untuk mendefinisikan fungsi.</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`def sapa():
    print("Halo, dunia!")

sapa()`}</code>
            </pre>

            <h2 id="parameter-dan-argumen">Parameter & Argumen</h2>
            <p>Parameter memungkinkan fungsi menerima input dari pemanggil.</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`def sapa(nama):
    print(f"Halo, {nama}!")

sapa("Rohman")  # Halo, Rohman!`}</code>
            </pre>

            <h2 id="return">Return (mengembalikan nilai)</h2>
            <p>Fungsi dapat mengembalikan nilai menggunakan <code>return</code>.</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`def tambah(a, b):
    return a + b

hasil = tambah(3, 4)
print(hasil)  # 7`}</code>
            </pre>

            <h2 id="best-practices">Best practices</h2>
            <ul>
              <li>Berikan nama fungsi yang jelas dan deskriptif.</li>
              <li>Jaga panjang fungsi agar singkat (single responsibility).</li>
              <li>Tulis docstring singkat di bagian atas fungsi jika perlu.</li>
            </ul>

            <h2 id="contoh-lanjutan">Contoh: Fungsi dengan docstring dan nilai default</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`def pangkat(x, n=2):
    """
    Mengembalikan x pangkat n. Default n=2 (kuadrat).
    """
    return x ** n

print(pangkat(3))    # 9
print(pangkat(2, 3)) # 8`}</code>
            </pre>

            <h2 id="kesimpulan">Kesimpulan</h2>
            <p>
              Fungsi membantu menyederhanakan kode dan meningkatkan reuse. Mulai biasakan memecah kode kompleks menjadi fungsi-fungsi kecil.
            </p>
          </section>

          {/* Footer */}
          <footer className="mt-8 border-t pt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Terakhir diperbarui: 19 Okt 2025</div>
            <div>
              <Link href="/dashboard" className="inline-block text-blue-600 hover:underline mr-4">← Kembali</Link>
              <Link href="/dashboard/python-parameter" className="inline-block text-blue-600 hover:underline">Baca lanjut →</Link>
            </div>
          </footer>
        </article>
      </LayoutWrapper>
    </div>
  );
}
