'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardButtons from '../../components/DashboardButtons';
import LayoutWrapper from '../../components/LayoutWrapper';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import ChartSection from '../../components/ChartSection';
import Notification from '../../components/Notification';
import Modal from '../../components/Modal';

type Item = {
  id: number;
  name: string;
  status: string;
  description: string;
};

const sampleData: Item[] = [
  { id: 1, name: 'Device A', status: 'Active', description: 'Detail Device A ...' },
  { id: 2, name: 'Device B', status: 'Inactive', description: 'Detail Device B ...' },
  { id: 3, name: 'Device C', status: 'Active', description: 'Detail Device C ...' },
  { id: 4, name: 'Device D', status: 'Maintenance', description: 'Detail Device D ...' },
  { id: 5, name: 'Device E', status: 'Inactive', description: 'Detail Device E ...' },
  { id: 6, name: 'Device F', status: 'Active', description: 'Detail Device F ...' },
  { id: 7, name: 'Device G', status: 'Active', description: 'Detail Device G ...' },
];

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

        {/* Data Table */}
        <DataTable data={sampleData} search={search} onRowClick={handleRowClick} />

        {/* Grafik */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Grafik Aktivitas Bulanan
          </h2>
          <ChartSection />
        </div>

        {/* Notifikasi */}
        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}

        {/* Modal Detail */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={selectedItem?.name || ''}>
          <p className="text-gray-700">{selectedItem?.description}</p>
          <p className="mt-2 font-semibold">Status: {selectedItem?.status}</p>
        </Modal>
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
