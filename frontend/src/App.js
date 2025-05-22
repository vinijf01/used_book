import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DetailBook from './pages/DetailBook';

// Import komponen lain yang mungkin Anda miliki, seperti Dashboard
// import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books/:slug" element={<DetailBook />} />

        {/* Rute default, jika ada */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;