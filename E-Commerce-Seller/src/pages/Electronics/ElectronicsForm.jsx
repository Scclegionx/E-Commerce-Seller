import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css'

function ElectronicsForm() {
    const [electronics, setElectronics] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        warranty_period: '',
        category: 'electronics'
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchElectronics();
    }, [id]);

    const fetchElectronics = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/electronics/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }, withCredentials : true
            });
            setElectronics(res.data);
        } catch (err) {
            console.error('Failed to fetch electronics', err);
        }
    };

    const handleChange = (e) => {
        setElectronics({ ...electronics, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = new Date().toISOString();

        const formattedData = {
            ...electronics,
            price: parseFloat(electronics.price).toFixed(2),
            stock: parseInt(electronics.stock),
            updated_at: now,
            created_at: id ? electronics.created_at : now
        };

        const url = id
            ? `http://127.0.0.1:8000/api/electronics/${id}/`
            : 'http://127.0.0.1:8000/api/electronics/';
        const method = id ? axios.put : axios.post;

        try {
            await method(url, formattedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }, withCredentials : true
            });
            navigate('/electronics');
        } catch (err) {
            console.error('Failed to save electronics', err.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={electronics.name} onChange={handleChange} placeholder="Name"
                   required/>
            <input type="text" name="description" value={electronics.description} onChange={handleChange}
                   placeholder="Description"/>
            <input type="number" name="price" value={electronics.price} onChange={handleChange} placeholder="Price"
                   required/>
            <input type="number" name="stock" value={electronics.stock} onChange={handleChange} placeholder="Stock"
                   required/>
            <input type="text" name="brand" value={electronics.brand} onChange={handleChange} placeholder="Brand"
                   required/>
            <input type="text" name="warranty_period" value={electronics.warranty_period} onChange={handleChange}
                   placeholder="Warranty Period" required/>
            <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default ElectronicsForm;
