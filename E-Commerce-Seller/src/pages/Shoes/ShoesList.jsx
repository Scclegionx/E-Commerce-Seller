import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ShoesList() {
    const [shoes, setShoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/shoes/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            console.log('API response:', res.data);
            const shoesData = res.data.results || [];
            setShoes(shoesData);
        } catch (err) {
            console.error('Failed to fetch shoes', err);
            setShoes([]);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/shoes/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            fetchShoes();
        } catch (err) {
            console.error('Failed to delete shoes', err);
        }
    };

    return (
        <div className="clothes-container">
            <h2>Shoes List</h2>
            <button className="create-btn" onClick={() => navigate('/shoes/create')}>Create Shoes</button>
            <table className="clothes-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Size</th>
                    <th>Material</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {shoes.map((shoe) => (
                    <tr key={shoe.id}>
                        <td>{shoe.name}</td>
                        <td>${shoe.price}</td>
                        <td>{shoe.stock}</td>
                        <td>{shoe.size}</td>
                        <td>{shoe.material}</td>
                        <td>
                            <button onClick={() => navigate(`/shoes/${shoe.id}`)}>Detail</button>
                            <button onClick={() => navigate(`/shoes/edit/${shoe.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(shoe.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShoesList;