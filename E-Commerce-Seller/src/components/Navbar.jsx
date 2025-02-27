import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/clothes">Clothes</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/shoes">Shoes</Link></li>
                <li><Link to="/electronics">Electronics</Link></li>
                {!token ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
