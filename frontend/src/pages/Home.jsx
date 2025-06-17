import React, { useEffect, useState } from "react";
import "../assets/main.css";
import { Link } from "react-router-dom";
import { getBooks } from "../api/api.js";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [books, setBooks] = useState([]); // ✅ state untuk menyimpan buku
    const [Loading, setLoading] = useState(true); // ✅ state untuk loading
    const navigate = useNavigate();

    const handleBookClick = (slug) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            navigate(`/books/${slug}`);
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response);
            } catch (error) {
                console.error("Gagal memuat buku:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="page-container">
            <div className="overlay"></div>
            <header className="navbar">
                <div className="logo">
                    <img src="/images/logo.png" alt="Logo" />
                    <span>UsedBooks</span>
                </div>
                <div className="search-login">
                    <input type="text" placeholder="Search" className="search-box" />
                    <Link to="/register" className="link-button">Daftar</Link>
                    <Link to="/login" className="blue-button">Masuk</Link>
                </div>
            </header>

            <main className="home-main">
                <section className="hero">
                    <img src="/images/book.png" alt="Books" />
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
                            <div key={index} className="book-card" onClick={() => handleBookClick(book.slug)} style={{ cursor: 'pointer' }}>
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
            </main>

            <Footer />

        </div>
    );
}
