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