import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/books/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setBooks(res.data.results);
        } catch (err) {
            console.error('Failed to fetch books', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            fetchBooks();
        } catch (err) {
            console.error('Failed to delete book', err);
        }
    };

    return (
        <div className="clothes-container">
            <h2>Books List</h2>
            <button className="create-btn" onClick={() => navigate('/books/create')}>Create Book</button>
            <table className="clothes-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.name}</td>
                        <td>{book.price}</td>
                        <td>{book.stock}</td>
                        <td>
                            <button onClick={() => navigate(`/books/${book.id}`)}>Detail</button>
                            <button onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
