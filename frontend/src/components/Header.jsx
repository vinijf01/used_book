// src/components/Header.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                <span className="font-bold text-xl">UsedBooks</span>
            </div>

            {/* Search bar */}
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Cari buku..."
                    className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>

            {/* Menu */}
            <div className="space-x-4">
                <a href="/register" className="text-gray-700 font-medium hover:text-blue-500">Daftar</a>
                <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Masuk</a>
            </div>
        </header>
    );
};

export default Header;
