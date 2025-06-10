import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import "../assets/main.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-tagline">
                    Toko Buku Pendidikan Bekas Berkualitas dengan Harga Terjangkau
                </p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <small>© {new Date().getFullYear()} UsedBooks. All rights reserved.</small>
            </div>
        </footer>
    );
};

export default Footer;
