// src/components/BookCard.jsx
import React from 'react';

// Props: menerima data buku dari parent (Home.jsx)
const BookCard = ({ title, author, price, image }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden w-48">
            <img src={image} alt={title} className="w-full h-60 object-cover" />
            <div className="p-4 text-center">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-gray-500">{author}</p>
                <p className="mt-2 font-bold text-blue-500">Rp. {price}</p>
            </div>
        </div>
    );
};

export default BookCard;
