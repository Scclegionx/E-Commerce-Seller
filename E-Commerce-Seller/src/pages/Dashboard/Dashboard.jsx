import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const revenueData = [
        { month: 'Jan', revenue: 1200 },
        { month: 'Feb', revenue: 2100 },
        { month: 'Mar', revenue: 800 },
    ];

    const productData = [
        { name: 'Sold', value: 300 },
        { name: 'In Stock', value: 500 },
    ];

    return (
        <div className="dashboard">
            <h1>Seller Dashboard</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Revenue</h3>
                    <BarChart width={300} height={200} data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#4CAF50" />
                    </BarChart>
                </div>
                <div className="card">
                    <h3>Product Distribution</h3>
                    <PieChart width={300} height={200}>
                        <Pie data={productData} dataKey="value" nameKey="name" fill="#2196F3" label />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
