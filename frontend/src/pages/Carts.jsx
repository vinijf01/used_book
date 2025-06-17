import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../api/api.js"; // ✅ pakai getCartItems
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../assets/main.css";

export default function Carts() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCartItems(); // ✅ ambil cart
                setCartItems(response);
            } catch (error) {
                console.error("Gagal memuat cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="page-container">
            <div className="overlay"></div>

            <Header showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

            <main className="home-main">
                <h1 className="text-center">Keranjang Saya</h1>

                <section className="book-list">
                    {loading ? (
                        <p>Memuat isi keranjang...</p>
                    ) : cartItems.length === 0 ? (
                        <p>Keranjang kamu kosong.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="book-card">
                                <img
                                    src={item.cover_image || "/images/novel.png"}
                                    alt={item.title}
                                    className="book-image"
                                />
                                <div className="book-content">
                                    <h3>{item.title}</h3>
                                    <p className="author">Qty: {item.quantity}</p>
                                </div>
                                <div className="book-price">
                                    <p className="price">Rp. {parseInt(item.price).toLocaleString("id-ID")}</p>
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
