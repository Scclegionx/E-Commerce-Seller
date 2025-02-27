import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css'

function ElectronicsList() {
    const [electronics, setElectronics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchElectronics();
    }, []);

    const fetchElectronics = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/electronics/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setElectronics(res.data || []);
            console.log(res.data)
        } catch (err) {
            console.error('Failed to fetch electronics', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/electronics/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            fetchElectronics();
        } catch (err) {
            console.error('Failed to delete electronics', err);
        }
    };

    return (
        <div className="clothes-container">
            <h2>Electronics List</h2>
            <button className="create-btn" onClick={() => navigate('/electronics/create')}>Create Electronics</button>
            <table className="clothes-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Brand</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {electronics.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.brand}</td>
                        <td>
                            <button onClick={() => navigate(`/electronics/${item.id}`)}>Detail</button>
                            <button onClick={() => navigate(`/electronics/edit/${item.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ElectronicsList;
