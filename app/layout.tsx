'use client';

import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500`}>
        <nav className="flex justify-between items-center p-4 bg-yellow-400 dark:bg-yellow-600 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pentest Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-300 px-4 py-2 rounded-lg shadow hover:brightness-110 transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        <div className="flex">
          <main className="flex-1 p-8 text-gray-900 dark:text-gray-100">{children}</main>
          <aside className="w-72 bg-yellow-50 dark:bg-yellow-900 border-l border-yellow-300 dark:border-yellow-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300 mb-4">Menu</h2>
            <ul className="flex flex-col gap-4 text-yellow-700 dark:text-yellow-400">
              <li><a href="#" className="hover:underline hover:text-yellow-900 dark:hover:text-yellow-200 transition">Beranda</a></li>
              <li><a href="#" className="hover:underline hover:text-yellow-900 dark:hover:text-yellow-200 transition">Peta</a></li>
              <li><a href="#" className="hover:underline hover:text-yellow-900 dark:hover:text-yellow-200 transition">Carousel</a></li>
              <li><a href="#" className="hover:underline hover:text-yellow-900 dark:hover:text-yellow-200 transition">Analisis</a></li>
            </ul>
          </aside>
        </div>
      </body>
    </html>
  );
}
