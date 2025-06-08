
'use client';

import React from 'react';
import LayoutWrapper from '../../components/LayoutWrapper'; // relatif dari app/Analisis
import ChartSection from '../../components/ChartSection'; // Aktifkan kalau kamu pakai grafik
import DataTable from '../../components/DataTable'; // Jika kamu punya komponen tabel
const dummyData = [
  { id: 1, sourceIP: '192.168.0.100', attack: 'Brute Force', time: '2025-06-08 10:30' },
  { id: 2, sourceIP: '10.10.10.20', attack: 'SQL Injection', time: '2025-06-08 11:12' },
  { id: 3, sourceIP: '172.16.0.55', attack: 'XSS', time: '2025-06-08 12:01' },
  { id: 4, sourceIP: '203.0.113.8', attack: 'Directory Traversal', time: '2025-06-08 13:45' },
];

const AnalisisPage: React.FC = () => {
  return (
    <LayoutWrapper collapsed={false}>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analisis Keamanan</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Log Serangan</h2>
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">IP Sumber</th>
                <th className="px-4 py-2">Jenis Serangan</th>
                <th className="px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.sourceIP}</td>
                  <td className="px-4 py-2">{row.attack}</td>
                  <td className="px-4 py-2">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aktifkan grafik jika diperlukan */}
      {/* <ChartSection /> */}
    </LayoutWrapper>
  );
};

export default AnalisisPage;
