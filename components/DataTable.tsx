import React, { useState, useMemo } from "react";

type Item = { id: number; name: string; status: string };

type DataTableProps = {
  data: Item[];
  search: string;
  onRowClick?: (item: Item) => void;
};

const PAGE_SIZE = 5;

const DataTable: React.FC<DataTableProps> = ({ data, search, onRowClick }) => {
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filteredSorted = useMemo(() => {
    return data
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [data, search, sortAsc]);

  const pageCount = Math.ceil(filteredSorted.length / PAGE_SIZE);
  const pagedData = filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Urutkan {sortAsc ? "Z-A" : "A-Z"}
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}
            >
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.status}</td>
            </tr>
          ))}
          {pagedData.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">
                Tidak ada data ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {pageCount}</span>
        <button
          disabled={page === pageCount}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
