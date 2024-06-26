// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import Link
import { Link } from 'react-router-dom';

function ConfirmOrder() {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const user_id = searchParams.get('user_id');
        const stateName = searchParams.get('stateName');
        const product = searchParams.get('product');
        const price = searchParams.get('price');
        setFormData({
            user_id: user_id || '',
            stateName: stateName || '',
            product: product || '',
            price: price || '',
            gallons: 1,
        });
    }, []);

    async function handleSubmission(event) {
        event.preventDefault();

        // Prevent submission if cancel button is clicked
        if (event.target.className === 'cancel-order') {
            window.location.href = '/';
            return;
        }

        const data = {
            user_id: formData.user_id,
            state: formData.stateName,
            product: formData.product,
            price: formData.price,
            quantity: formData.gallons,
            total: formData.price * formData.gallons,
        };

        try {
            const response = await axios.post(
                'https://capstone-325-api.onrender.com/orders/',
                data
            );
            console.log(response.data);
            window.location.href = '/orders';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container page-content">
            <h2>Order Confirmation</h2>
            <div className="container page-content">
                <form onSubmit={handleSubmission} className="order-form">
                    <div>
                        <label>Date:</label>
                        <input
                            type="text"
                            value={new Date().toLocaleDateString()}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>State:</label>
                        <input
                            type="text"
                            value={formData.stateName}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Product:</label>
                        <input type="text" value={formData.product} readOnly />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            value={`$ ${formData.price}`}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Number of Gallons:</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={formData.gallons}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gallons: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Total:</label>
                        <input
                            type="text"
                            value={`$ ${formData.price * formData.gallons}`}
                            readOnly
                        />
                    </div>
                    <button className="submit-order" type="submit">
                        Submit Order
                    </button>
                    <Link to="/" className="cancel-order">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ConfirmOrder;
