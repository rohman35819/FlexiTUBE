import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus status login
    localStorage.removeItem('isAuthenticated');
    // Redirect ke halaman login
    navigate('/signin');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p>Selamat datang, Anda sudah login!</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
