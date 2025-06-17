import api from './axios.js';

// Get All Books
export const getBooks = async () => {
    const response = await api.get('/api/books');
    return response.data.data;
}

//Get Book by Slug
export const getBookDetailByslug = async (slug) => {
    const response = await api.get(`/api/books/${slug}`);
    return response.data.data;
};

// Add Book to Cart
export const addToCart = async (bookId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("User not authenticated");

    const response = await api.post('/api/cart', {
        book_id: bookId,
        quantity: quantity,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
};

// get all cart items for the logged-in user
export const getCartItems = async () => {
    const response = await api.get('/api/cart'); // pastikan user sudah login & token ada
    return response.data.data;
};