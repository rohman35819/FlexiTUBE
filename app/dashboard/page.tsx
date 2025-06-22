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
            <Link href="/web-timing-attack">
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
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
