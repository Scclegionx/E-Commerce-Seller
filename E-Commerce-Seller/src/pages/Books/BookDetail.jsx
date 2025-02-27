import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css'; // Reusing clothes CSS

function BookDetail() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
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

    if (!book) return <p>Loading...</p>;

    return (
        <div className="clothes-detail-container">
            <h2>Book Detail</h2>
            <p><strong>Title:</strong> {book.name}</p>
            <p><strong>Description:</strong> {book.description || 'No description available'}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Published Date:</strong> {book.published_date}</p>
            <button onClick={() => navigate('/books')}>Back to list</button>
        </div>
    );
}

export default BookDetail;