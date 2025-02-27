import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ClothesForm() {
    const [clothes, setClothes] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        size: '',
        color: '',
        category: 'clothes' // Thêm mặc định category "clothes"
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchClothes();
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

    const handleChange = (e) => {
        setClothes({ ...clothes, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();
        const formattedData = {
            ...clothes,
            price: parseFloat(clothes.price).toFixed(2),
            stock: parseInt(clothes.stock),
            updated_at: now,
            created_at: id ? clothes.created_at : now,
        };

        const url = id
            ? `http://127.0.0.1:8000/api/clothes/${id}/`
            : 'http://127.0.0.1:8000/api/clothes/';
        const method = id ? axios.put : axios.post;

        try {
            const res = await method(url, formattedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            navigate('/clothes');
        } catch (err) {
            console.error('Failed to save clothes', err.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={clothes.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={clothes.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={clothes.price} onChange={handleChange} placeholder="Price" required />
            <input type="number" name="stock" value={clothes.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="text" name="size" value={clothes.size} onChange={handleChange} placeholder="Size" required />
            <input type="text" name="color" value={clothes.color} onChange={handleChange} placeholder="Color" required />
            <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default ClothesForm;
