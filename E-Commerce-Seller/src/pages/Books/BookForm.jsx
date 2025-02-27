import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookForm() {
    const [book, setBook] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        author: '',
        genre: '',
        published_date: '',
        category: 'book'
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setBook(res.data);
        } catch (err) {
            console.error('Failed to fetch book', err);
        }
    };

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();
        const formattedData = {
            ...book,
            price: parseFloat(book.price).toFixed(2),
            stock: parseInt(book.stock),
            updated_at: now,
            created_at: id ? book.created_at : now,
        };

        const url = id
            ? `http://127.0.0.1:8000/api/books/${id}/`
            : 'http://127.0.0.1:8000/api/books/';
        const method = id ? axios.put : axios.post;

        try {
            await method(url, formattedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            navigate('/books');
        } catch (err) {
            console.error('Failed to save book', err.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={book.name} onChange={handleChange} placeholder="Title" required />
            <input type="text" name="description" value={book.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" required />
            <input type="number" name="stock" value={book.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
            <input type="text" name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
            <input type="date" name="published_date" value={book.published_date} onChange={handleChange} placeholder="Published Date" required />
            <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default BookForm;