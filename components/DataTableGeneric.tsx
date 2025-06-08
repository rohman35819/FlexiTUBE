// components/DataTableGeneric.tsx
import React, { useMemo, useState } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type DataTableGenericProps<T> = {
  data: T[];
  search: string;
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
};

const PAGE_SIZE = 5;

function DataTableGeneric<T extends object>({
  data,
  search,
  columns,
  onRowClick,
}: DataTableGenericProps<T>) {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="border px-4 py-2">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(item)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className="border px-4 py-2">
                  {String(item[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
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
        <span>{page} / {pageCount}</span>
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
}

export default DataTableGeneric;
