import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import '../assets/main.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const data = await register(name, email, password, passwordConfirmation);
            navigate('/dashboard');
            console.log('Registrasi berhasil:', data);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: error.message || 'Registrasi gagal. Silakan coba lagi.' });
            }
        }
    };

    return (
        <div className='auth-wrapper'>
            <div className='overlay'></div>
            <div className='content'>
                <form className="form-container" onSubmit={handleRegister}>
                    <img src="/images/logo.png" alt="Logo" />
                    <h2>DAFTAR</h2>

                    {errors.general && <p className="error-message">{errors.general}</p>}

                    <input
                        type="text"
                        placeholder="Nama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <input
                        type="password"
                        placeholder="Konfirmasi Password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="error-message">{errors.password_confirmation}</p>
                    )}

                    <button type="submit">Daftar</button>

                    <p>
                        Sudah punya akun? <a href="/login">Masuk di sini</a>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Register;
