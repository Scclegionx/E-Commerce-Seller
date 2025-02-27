import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ElectronicsList() {
    const [electronics, setElectronics] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchElectronics();
    }, [page, sortBy, order, search]);

    const fetchElectronics = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/electronics/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                params: {
                    page,
                    page_size: pageSize,
                    sort_by: sortBy,
                    order,
                    name: search
                }
            });
            setElectronics(res.data.results || []);
            setTotalPages(res.data.total_pages);
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

    const handleSort = (field) => {
        if (sortBy === field) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setOrder('asc');
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset về trang đầu khi tìm kiếm
    };

    return (
        <div className="clothes-container">
            <h2>Electronics List</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={handleSearch}
            />
            <button className="create-btn" onClick={() => navigate('/electronics/create')}>Create Electronics</button>
            <table className="clothes-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name {sortBy === 'name' ? (order === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('price')}>Price {sortBy === 'price' ? (order === 'asc' ? '↑' : '↓') : ''}</th>
                    <th onClick={() => handleSort('stock')}>Stock {sortBy === 'stock' ? (order === 'asc' ? '↑' : '↓') : ''}</th>
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
            <div className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default ElectronicsList;
