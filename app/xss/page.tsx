'use client';

import Buttonxss from '../../components/buttonxss';
import React from 'react';

export default function XSSDashboardPage() {
  const stats = [
    {
      title: '🔍 Deteksi Payload',
      value: 3,
      color: 'green',
      desc: 'Payload XSS berhasil dijalankan',
    },
    {
      title: '📦 Cookie Terekam',
      value: 5,
      color: 'yellow',
      desc: 'Dokumen cookie berhasil dicuri',
    },
    {
      title: '🧠 Keylogger Aktif',
      value: 2,
      color: 'red',
      desc: 'Korban tercatat mengetikkan input',
    },
  ];

  const simulations = [
    {
      icon: '🍪',
      title: 'Auto Cookie Stealer',
      color: 'green',
      desc: 'Mengirimkan dokumen.cookie secara otomatis ke server penyerang.',
    },
    {
      icon: '⌨️',
      title: 'Keylogger Injection',
      color: 'yellow',
      desc: 'Merekam semua input dari pengguna secara real-time.',
    },
    {
      icon: '🎣',
      title: 'Phishing Login Form',
      color: 'red',
      desc: 'Form login palsu untuk mencuri kredensial pengguna.',
    },
  ];

  return (
    <div className="space-y-10 relative">
      {/* Header */}
      <header className="border-b pb-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          🧪 XSS Attack Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Pantau aktivitas simulasi dan dampak serangan Cross-Site Scripting (XSS).
        </p>
      </header>

      {/* Statistik */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          📊 Statistik Serangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border-t-4 border-${stat.color}-500 hover:shadow-xl transition duration-300`}
            >
              <h3 className={`text-lg font-semibold text-${stat.color}-600`}>
                {stat.title}
              </h3>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simulasi Serangan */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          🧪 Simulasi Serangan XSS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim, index) => (
            <div
              key={index}
              className={`group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-transparent hover:border-${sim.color}-500 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl transition-transform group-hover:scale-125">
                  {sim.icon}
                </span>
                <h3
                  className={`text-lg font-semibold text-gray-800 dark:text-white group-hover:text-${sim.color}-600 transition-colors`}
                >
                  {sim.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all">
                {sim.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tombol ke halaman eksploitasi */}
      <Buttonxss />
    </div>
  );
}
