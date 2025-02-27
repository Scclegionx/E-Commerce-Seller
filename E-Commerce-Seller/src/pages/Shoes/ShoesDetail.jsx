import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ShoesDetail() {
    const [shoes, setShoes] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchShoes();
    }, [id]);

    const fetchShoes = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/shoes/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setShoes(res.data);
        } catch (err) {
            console.error('Failed to fetch shoes', err);
        }
    };

    if (!shoes) return <p>Loading...</p>;

    return (
        <div className="clothes-detail-container">
            <h2>Shoes Detail</h2>
            <p><strong>Name:</strong> {shoes.name}</p>
            <p><strong>Description:</strong> {shoes.description}</p>
            <p><strong>Price:</strong> ${shoes.price}</p>
            <p><strong>Stock:</strong> {shoes.stock}</p>
            <p><strong>Size:</strong> {shoes.size}</p>
            <p><strong>Material:</strong> {shoes.material}</p>
            <button onClick={() => navigate('/shoes')}>Back to list</button>
        </div>
    );
}

export default ShoesDetail;