import { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Thêm file CSS

function UnpaidAndPaidOrders() {
    const [unpaidOrders, setUnpaidOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);

    useEffect(() => {
        fetchUnpaidOrders();
        fetchPaidOrders();
    }, []);

    const fetchUnpaidOrders = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/orders/unpaid/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                withCredentials: true
            });
            setUnpaidOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch unpaid orders', err);
        }
    };

    const fetchPaidOrders = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/orders/paid/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                withCredentials: true
            });
            setPaidOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch paid orders', err);
        }
    };

    const confirmPayment = async (orderId) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/orders/${orderId}/confirm-payment/`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                withCredentials: true
            });
            fetchUnpaidOrders(); // Reload unpaid orders
            fetchPaidOrders(); // Reload paid orders
        } catch (err) {
            console.error('Failed to confirm payment', err);
        }
    };

    const renderOrder = (order, showConfirmButton = false) => (
        <tr key={order.id}>
            <td>{order.id}</td>
            <td>${order.total}</td>
            <td>{order.status}</td>
            <td>{order.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
            {showConfirmButton && (
                <td>
                    <button onClick={() => confirmPayment(order.id)} className="confirm-btn">
                        Xác nhận thanh toán
                    </button>
                </td>
            )}
        </tr>
    );

    return (
        <div className="orders-container">
            <div className="orders-section">
                <h2>🕒 Unpaid Orders</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unpaidOrders.length > 0 ? unpaidOrders.map(order => renderOrder(order, true)) : (
                        <tr><td colSpan="5">Không có đơn hàng chưa thanh toán</td></tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="orders-section">
                <h2>✅ Paid Orders</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paidOrders.length > 0 ? paidOrders.map(order => renderOrder(order)) : (
                        <tr><td colSpan="4">Không có đơn hàng đã thanh toán</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UnpaidAndPaidOrders;
