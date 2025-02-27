import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/seller/auth/register/', { username, password, shop_name: shopName });
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
