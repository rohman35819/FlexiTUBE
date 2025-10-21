'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardButtons from '../../components/DashboardButtons';
import LayoutWrapper from '../../components/LayoutWrapper';
import FilterBar from '../../components/FilterBar';
import Notification from '../../components/Notification';

import { Item } from '@/lib/types';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const triggerNotification = () => {
    setNotification('Data berhasil diperbarui!');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <LayoutWrapper collapsed={collapsed}>
        <DashboardButtons />

        {/* Filter & Search */}
        <FilterBar search={search} setSearch={setSearch} />

        {/* Tombol notifikasi */}
        <button
          onClick={triggerNotification}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Trigger Notifikasi
        </button>

        {/* Notifikasi */}
        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}

        {/* Menu Simulasi Timing Attack */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Simulasi Pentest</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/web-timing-attack" className="group">
              <div className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow cursor-pointer transition-all">
                <h3 className="text-md font-bold text-blue-600">🕒 Web Timing Attack</h3>
                <p className="text-sm text-gray-600">
                  Uji delay berbasis input (username/password) untuk latihan bug bounty.
                </p>
              </div>
            </Link>

            {/* Tambahkan simulasi lain di sini nanti */}
          </div>
        </div>

        {/* Artikel / Tutorial Shortcut */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Artikel & Tutorial</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card artikel: Fungsi di Python */}
            <Link href="/python_fungsi" className="group">
              <article className="p-4 bg-white border rounded-lg shadow-sm hover:shadow md:hover:scale-[1.01] transition transform cursor-pointer">
                <h3 className="text-md font-bold text-gray-800 group-hover:text-blue-600">
                  Fungsi di Python
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Pengantar fungsi di Python: definisi, parameter, return, dan contoh sederhana.
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Bacaan singkat</span>
                  <span className="text-xs text-gray-400">▶</span>
                </div>
              </article>
            </Link>

            {/* Tombol kecil untuk langsung membuka halaman */}
            <div className="p-4 flex items-center justify-between bg-gray-50 border rounded-lg">
              <div>
                <div className="text-sm font-semibold">Butuh cepat baca?</div>
                <div className="text-xs text-gray-500">Buka artikel ringkasan</div>
              </div>

              <Link href="/dashboard/python-fungsi">
                <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Baca: Fungsi
                </button>
              </Link>
            </div>
          </div>
        </div>

      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
