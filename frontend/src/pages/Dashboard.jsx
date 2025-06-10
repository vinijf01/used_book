import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks } from "../api/api.js";
import Footer from "../components/Footer";
import Header from "../components/Header"; // ✅ import komponen Header
import "../assets/main.css";

export default function Dashboard() {
    const [books, setBooks] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false); // ✅ state untuk dropdown
    const navigate = useNavigate();

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
            {/* ✅ gunakan komponen Header */}
            <Header showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

            <main className="home-main">
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
                            <Link to={`/books/${book.slug}`} key={index} className="book-card">
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
                            </Link>
                        ))
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
