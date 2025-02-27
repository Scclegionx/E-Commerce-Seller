import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ShoesForm() {
    const [shoes, setShoes] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        size: '',
        material: '',
        category: 'shoes'
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchShoes();
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

    const handleChange = (e) => {
        setShoes({ ...shoes, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();
        const formattedData = {
            ...shoes,
            price: parseFloat(shoes.price).toFixed(2),
            stock: parseInt(shoes.stock),
            updated_at: now,
            created_at: id ? shoes.created_at : now
        };

        const url = id ? `http://127.0.0.1:8000/api/shoes/${id}/` : 'http://127.0.0.1:8000/api/shoes/';
        const method = id ? axios.put : axios.post;

        try {
            await method(url, formattedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            navigate('/shoes');
        } catch (err) {
            console.error('Failed to save shoes', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="clothes-form">
            <input type="text" name="name" value={shoes.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={shoes.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={shoes.price} onChange={handleChange} placeholder="Price" required />
            <input type="number" name="stock" value={shoes.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="text" name="size" value={shoes.size} onChange={handleChange} placeholder="Size" required />
            <input type="text" name="material" value={shoes.material} onChange={handleChange} placeholder="Material" required />
            <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default ShoesForm;