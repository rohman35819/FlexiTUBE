import React from 'react';
import '../styles/categoryMenu.css';

const categories = [
  'Semua', 'Musik', 'Game', 'Live', 'Podcast',
  'Teknologi', 'Berita', 'Film', 'Edukasi', 'Olahraga'
];

export default function CategoryMenu({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-menu">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={`category-button ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
