import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
    const { token } = useContext(AppContext);
    const { id: orderId } = useParams(); // orderId من الرابط

    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);


    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setOrderDetails(response.data.order);
            } else {
                setError('Failed to fetch order details.');
            }
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to fetch order details.');
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        } else {
            setError('Order ID is missing.');
        }
    }, [orderId]);

    return (
        <div className="order-confirmation-container">
            <h1>Your order has been received!</h1>
            <video width="600" autoPlay loop muted>
                <source src="path_to_your_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>Be ready! our representative will contact you soon!</p>
            <h2>Order Details:</h2>
            <p>Order Number: {orderDetails._id}</p>
            <p>Shipping Address: {orderDetails.shippingAddress.fullAddress}</p>
            <p>Total: {orderDetails.totalAmount}</p>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <button>View all previous orders</button>
        </div>
    );
}

export default OrderConfirmation
/**onClick={() => navigate('/my-orders')} */