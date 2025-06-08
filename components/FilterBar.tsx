import React from "react";

type FilterBarProps = {
  search: string;
  setSearch: (val: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Cari data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded flex-grow"
      />
      {/* Kamu bisa tambahkan filter dropdown, tombol refresh dll di sini */}
    </div>
  );
};

export default FilterBar;
