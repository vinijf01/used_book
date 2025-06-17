import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../assets/main.css'; // Pastikan path ini sesuai dengan struktur proyek Anda
import Footer from "../components/Footer";
import Header from "../components/Header";
import { addToCart } from '../api/api'; // Pastikan path ini sesuai dengan struktur proyek Anda

const DetailBook = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await api.get(`/api/books/${slug}`);
                setBook(res.data.data);
            } catch (error) {
                console.error('Gagal memuat data buku:', error);
            }
        }

        fetchBook();
    }, [slug]);

    const handleLogout = async () => {
        try {
            await api.post('/api/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Gagal logout:', error);
        }
    };

    if (!book) return <div className="loading">Loading...</div>;

    const averageRating =
        book.reviews?.length > 0
            ? (
                book.reviews.reduce((sum, r) => sum + r.rating, 0) /
                book.reviews.length
            ).toFixed(1)
            : 0;

    const handleAddToCart = async () => {
        try {
            await addToCart(book.id);
            alert("Buku berhasil ditambahkan ke keranjang");
        } catch (error) {
            if (error.message === "User not authenticated") {
                alert("Silakan login terlebih dahulu");
                navigate('/login');
            } else {
                console.error('Gagal menambahkan ke keranjang:', error);
                alert("Gagal menambahkan ke keranjang");
            }
        }
    };


    return (
        <div className="page-container">
            <div className="overlay"></div>
            {/* ✅ gunakan komponen Header */}
            <Header showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

            <main className="home-main">
                <div class="hero-box">
                    <div class="hero-container">
                        {/* <button className="favorite-icon"></button> */}
                        {/* <i className="fas fa-heart"></i> */}
                        <img className="book-cover" src={book.cover_image ? `http://localhost:8000/storage/${book.cover_image}` : "/images/novel.png"} alt={book.title} />
                        <div class="book-info">
                            <h1 class="book-title">{book.title}</h1>
                            <h2 class="book-author">{book.author}</h2>
                            <div class="cta-container">
                                <div class="price-tag">Rp. {book.price}</div>
                                <button class="add-to-cart" onClick={handleAddToCart}>+ Keranjang</button>
                            </div>
                        </div>
                    </div>
                </div>


                <section className="book-detail">
                    <div className='bood-description'>
                        <h3>Deskripsi</h3>
                        <p>{book.description}</p>
                    </div>


                    <div className="rating-section">
                        <h3>Ulasan Pembeli</h3>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <i key={i} className="fas fa-star" style={{ color: i <= averageRating ? '#FFD700' : '#ccc' }}></i>
                            ))}
                        </div>
                        <p>{averageRating} dari {book.reviews?.length || 0} Ulasan</p>
                        <button className="see-reviews">Lihat Ulasan</button>
                    </div>

                    <div className="seller-info">
                        <i className="fas fa-user-circle seller-icon"></i>
                        <span className="store-name">Store Name</span>
                        {/* <span className="store-name">{book.store_name}</span> */}
                    </div>

                </section>
            </main>

            <Footer />
        </div>
    );
}
export default DetailBook;
