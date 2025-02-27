import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Clothes.css';

function ClothesList() {
    const [clothes, setClothes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [stockFilter, setStockFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClothes(1);
    }, [sortField, sortDirection, stockFilter, sizeFilter, colorFilter]);

    const fetchClothes = async (page) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/clothes/`, {
                params: {
                    page: page,
                    ordering: sortDirection === 'asc' ? sortField : `-${sortField}`,
                    stock: stockFilter,
                    size: sizeFilter,
                    color: colorFilter
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setClothes(res.data.results);
            console.log(res.data);
            // Xác định currentPage bằng tham số page
            setCurrentPage(page);

            // Tính totalPages dựa trên count từ BE
            const pageSize = 10; // Giả sử PAGE_SIZE của BE là 10
            setTotalPages(Math.ceil(res.data.count / pageSize));

        } catch (err) {
            console.error('Failed to fetch clothes', err);
        }
    };

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/clothes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            fetchClothes(currentPage);
        } catch (err) {
            console.error('Failed to delete clothes', err);
        }
    };

    const renderSortIcon = (field) => {
        if (sortField !== field) return '⇅';
        return sortDirection === 'asc' ? '▲' : '▼';
    };

    return (
        <div className="clothes-container">
            <h2>Clothes List</h2>
            <div className="filters">
                <input
                    type="number"
                    placeholder="Filter by Stock"
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Size"
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Color"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                />
            </div>
            <button className="create-btn" onClick={() => navigate('/clothes/create')}>Create Clothes</button>
            <table className="clothes-table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th onClick={() => toggleSort('name')}>
                        Name {renderSortIcon('name')}
                    </th>
                    <th onClick={() => toggleSort('price')}>
                        Price {renderSortIcon('price')}
                    </th>
                    <th onClick={() => toggleSort('stock')}>
                        Stock {renderSortIcon('stock')}
                    </th>
                    <th onClick={() => toggleSort('size')}>
                        Size {renderSortIcon('size')}
                    </th>
                    <th onClick={() => toggleSort('color')}>
                        Color {renderSortIcon('color')}
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clothes.map((item, index) => (
                    <tr key={item.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.size}</td>
                        <td>{item.color}</td>
                        <td>
                            <button onClick={() => navigate(`/clothes/${item.id}`)}>Detail</button>
                            <button onClick={() => navigate(`/clothes/edit/${item.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {currentPage > 1 && <button onClick={() => fetchClothes(currentPage - 1)}>Previous</button>}
                {currentPage < totalPages && <button onClick={() => fetchClothes(currentPage + 1)}>Next</button>}
                <span>Page {currentPage} of {totalPages}</span>
            </div>
        </div>
    );
}

export default ClothesList;
