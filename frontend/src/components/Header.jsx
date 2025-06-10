// components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import "../assets/main.css";

export default function Header({ showDropdown, setShowDropdown }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                <img src="/images/logo.png" alt="Logo" />
                <span>UsedBooks</span>
            </div>
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
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                                className="logout-button"
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
