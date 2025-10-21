'use client';
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body className={`${darkMode ? 'dark' : ''} flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors`}>
        
        {/* Konten utama */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:justify-between md:items-start gap-y-6 md:gap-y-0">
            
            {/* Kolom 1: Logo & deskripsi + social */}
            <div className="md:w-1/3 text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Platform belajar pentest & coding interaktif. Semua materi disusun untuk pemula sampai expert.
              </p>
              <div className="flex justify-center md:justify-start gap-3 mt-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"><FaFacebookF /></a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"><FaTwitter /></a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"><FaInstagram /></a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"><FaLinkedinIn /></a>
              </div>
            </div>

            {/* Kolom 2: Links (horizontal desktop, vertical mobile) */}
            <div className="md:w-2/3 flex flex-col md:flex-row justify-between gap-y-6 md:gap-y-0 md:gap-x-8 text-center md:text-left">
              
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Produk</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-yellow-500 transition">Dashboard</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Tutorial</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Analisis</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Perusahaan</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-yellow-500 transition">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Karir</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Bantuan</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="#" className="hover:text-yellow-500 transition">Support</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">FAQ</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Kontak</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Legal</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-yellow-500 transition">Privasi</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Syarat & Ketentuan</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Cookie Policy</a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom line */}
          <div className="border-t border-gray-300 dark:border-gray-700 mt-6">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
              &copy; 2025 FlexiTUBE. Semua hak dilindungi.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
