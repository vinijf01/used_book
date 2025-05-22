import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../assets/Home.css";

const DetailBook = () => {
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token'); // Pastikan token disimpan setelah login

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get(`/api/books/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBook(response.data.book);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Gagal memuat detail buku:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [slug]);

    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    if (loading) return <p>Loading...</p>;
    if (!book) return <p>Buku tidak ditemukan.</p>;

    return (
        <div className="detail-container">
            <div className="book-header">
                <img src={book.cover_image || "/images/novel.png"} alt={book.title} className="cover-image" />
                <div className="info">
                    <h2>{book.title}</h2>
                    <h4 style={{ fontStyle: 'italic' }}>{book.author}</h4>
                    <p className="price">Rp. {parseInt(book.price).toLocaleString("id-ID")}</p>
                    <button className="btn-cart">+ Keranjang</button>
                </div>
            </div>

            <div className="description">
                <h3>Deskripsi</h3>
                <p>{book.description}</p>
            </div>

            <div className="reviews">
                <h3>Ulasan Pembeli</h3>
                <div className="rating-summary">
                    <p style={{ fontSize: '20px' }}>
                        {getAverageRating()} ⭐ dari {reviews.length} Ulasan
                    </p>
                </div>
                <button className="btn-review">Lihat Ulasan</button>
                <div className="review-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p><strong>{review.user.name}</strong> ({review.rating} ⭐)</p>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="seller">
                <p>Toko Gramedia</p>
            </div>
        </div>
    );
};

export default DetailBook;
