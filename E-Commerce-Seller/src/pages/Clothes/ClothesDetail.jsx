import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ClothesDetail() {
    const [clothes, setClothes] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchClothes();
    }, [id]);

    const fetchClothes = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/clothes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setClothes(res.data);
        } catch (err) {
            console.error('Failed to fetch clothes', err);
        }
    };

    if (!clothes) return <p>Loading...</p>;

    return (
        <div className="clothes-detail-container">
            <h2>Clothes Detail</h2>
            <p><strong>Name:</strong> {clothes.name}</p>
            <p><strong>Description:</strong> {clothes.description || 'No description available'}</p>
            <p><strong>Price:</strong> ${clothes.price}</p>
            <p><strong>Stock:</strong> {clothes.stock}</p>
            <p><strong>Size:</strong> {clothes.size}</p>
            <p><strong>Color:</strong> {clothes.color}</p>
            <p><strong>Category:</strong> {clothes.category}</p>
            <p><strong>Created At:</strong> {new Date(clothes.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(clothes.updated_at).toLocaleString()}</p>
            <button onClick={() => navigate('/clothes')}>Back to list</button>
        </div>
    );
}

export default ClothesDetail;
