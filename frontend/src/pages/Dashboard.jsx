import React, { useEffect, useState } from "react";
import "../assets/Home.css";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { getBooks } from "../api/api.js";
import { useNavigate } from "react-router-dom"; // Pastikan ini sesuai dengan path yang benar


export default function Dashboard() {
    const [showDropdown, setShowDropdown] = useState(false); // ✅ Dipindahkan ke dalam fungsi
    const navigate = useNavigate();
    const [books, setBooks] = useState([]); // ✅ state untuk menyimpan buku
    const [Loading, setLoading] = useState(true); // ✅ state untuk loading

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response); // ✅ Sesuaikan struktur response
            } catch (error) {
                console.error("Gagal memuat buku:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);



    return (
        <div className="beranda-container">
            <div className="overlay"></div>
            <div className="content">
                <header className="navbar">
                    <div className="logo"><img src="/images/logo.png" alt="Logo" /><span>UsedBooks</span></div>
                    <div className="search-login">
                        <input type="text" placeholder="Search" className="search-box" />
                        <Link to="/cart" aria-label="Cart">
                            <i className="fas fa-shopping-cart icon"></i>
                        </Link>
                        <Link to="/favorites" aria-label="Favorite">
                            <i className="fa-regular fa-heart icon"></i>
                        </Link>

                        <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
                            <i className="fas fa-user-circle icon"></i>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <Link to="/profile/edit">Edit Profile</Link>
                                    <Link to="/reset-password">Reset Password</Link>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                    }} className="logout-button">
                                        Logout
                                    </a>
                                </div>

                            )}
                        </div>
                    </div>
                </header>

                <section className="hero">
                    <img src="/images/book.png" alt="Books" className="hero-image" />
                    <div className="hero-text">
                        <h1>Buku</h1>
                        <h1>Rekomendasi</h1>
                        <p>Buku Paket IPA SD, LKS SMA, dll.</p>
                    </div>
                </section>

                <section className="book-list">
                    {Loading ? (
                        <p>Loading buku...</p>
                    ) : books.length === 0 ? (
                        <p>Tidak ada buku tersedia.</p>
                    ) : (
                        books.map((book, index) => (
                            <div className="book-card" key={index}>
                                <img
                                    src={book.cover_image || "/images/novel.png"}
                                    alt={book.title}
                                    className="book-image"
                                />
                                <div className="book-content">
                                    <h3>{book.title}</h3>
                                    <p className="author">{book.author}</p>
                                </div>
                                <div className="book-price">
                                    <p className="price">Rp. {parseInt(book.price).toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                <footer className="footer">
                    <div className="footer-content">
                        <p className="footer-tagline">
                            Toko Buku Pendidikan Bekas Berkualitas dengan Harga Terjangkau
                        </p>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <small>© {new Date().getFullYear()} UsedBooks. All rights reserved.</small>
                    </div>
                </footer>
            </div>
        </div>
    );
}
