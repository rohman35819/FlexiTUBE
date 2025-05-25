// components/Header.tsx
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      {/* Contoh penggunaan Image */}
      <Image
        src="/logo.png"  // sesuaikan path gambarmu
        alt="Logo FlexiTUBE"
        width={120}
        height={40}
      />
      {/* Konten header lainnya */}
    </header>
  );
};

export default Header;
