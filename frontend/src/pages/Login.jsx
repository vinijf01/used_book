import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import '../assets/main.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await login(email, password);
            navigate('/dashboard');
            console.log('Login berhasil:', data);
        } catch (error) {
            setError(error.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
            console.error('Login gagal:', error);
        }
    };

    const handleNavigateRegister = () => {
        navigate('/register');
    };

    return (
        <div className="auth-wrapper">
            <div className="overlay"></div>
            <div className='content'>
                <form onSubmit={handleLogin} className="form-container">
                    <img src="/images/logo.png" alt="Logo" />
                    <h2>MASUK</h2>

                    {error && <p className="error-message">{error}</p>}

                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-button">Masuk</button>

                    <p className="separator-text">Belum punya akun?</p>

                    <button type="button" className="register-button" onClick={handleNavigateRegister}>
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
