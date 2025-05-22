// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white text-center py-6 mt-10">
            <div className="font-bold text-xl">UsedBooks</div>
            <p className="text-sm mt-2">
                "Toko Buku Pendidikan Bekas Berkualitas<br />
                Dengan Harga Terjangkau." - Ir. H. Joko Widodo
            </p>
            <div className="flex justify-center mt-4 space-x-4">
                <FaFacebookF />
                <FaInstagram />
                <FaTwitter />
            </div>
        </footer>
    );
};

export default Footer;
