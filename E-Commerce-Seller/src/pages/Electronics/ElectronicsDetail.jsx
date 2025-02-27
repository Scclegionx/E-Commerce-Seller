import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css'

function ElectronicsDetail() {
    const [electronics, setElectronics] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchElectronics();
    }, [id]);

    const fetchElectronics = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/electronics/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setElectronics(res.data);
        } catch (err) {
            console.error('Failed to fetch electronics', err);
        }
    };

    if (!electronics) return <p>Loading...</p>;

    return (
        <div className="clothes-detail-container">
            <h2>Electronics Detail</h2>
            <p><strong>Name:</strong> {electronics.name}</p>
            <p><strong>Description:</strong> {electronics.description || 'No description available'}</p>
            <p><strong>Price:</strong> ${electronics.price}</p>
            <p><strong>Stock:</strong> {electronics.stock}</p>
            <p><strong>Brand:</strong> {electronics.brand}</p>
            <p><strong>Warranty:</strong> {electronics.warranty_period} months</p>
            <button onClick={() => navigate('/electronics')}>Back to list</button>
        </div>
    );
}

export default ElectronicsDetail;
