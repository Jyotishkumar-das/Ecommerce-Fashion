import React, { useEffect, useState } from "react";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:4000/api/order/list",
                {
                    method: "GET",

                    headers: {
                        "admin-email":
                            localStorage.getItem(
                                "adminEmail"
                            ),

                        "admin-password":
                            localStorage.getItem(
                                "adminPassword"
                            ),
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            } else {
                alert(data.message);
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            const response = await fetch(
                "http://localhost:4000/api/order/status",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "admin-email":
                            localStorage.getItem(
                                "adminEmail"
                            ),

                        "admin-password":
                            localStorage.getItem(
                                "adminPassword"
                            ),
                    },

                    body: JSON.stringify({
                        orderId,
                        status
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(
                    "Order status updated"
                );

                fetchOrders();

            } else {

                alert(
                    data.message ||
                    "Failed to update status"
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to server"
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="admin-page">
                <h2>ORDERS</h2>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="admin-page">

            <h2>ORDERS</h2>

            {orders.length === 0 ? (

                <div className="empty-orders">
                    <h3>No Orders Found</h3>
                    <p>
                        There are currently no
                        orders.
                    </p>
                </div>

            ) : (

                <div className="admin-orders">

                    {orders.map((order) => (

                        <div
                            className="admin-order-card"
                            key={order._id}
                        >

                            <div className="order-info">

                                <p>
                                    <strong>
                                        Order ID:
                                    </strong>{" "}
                                    {order._id}
                                </p>

                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>
                                        Payment:
                                    </strong>{" "}
                                    {
                                        order.paymentMethod
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Amount:
                                    </strong>{" "}
                                    ${order.amount}
                                </p>

                            </div>

                            <div className="order-products">

                                {order.items?.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="order-product"
                                        >

                                            <span>
                                                {
                                                    item.name ||
                                                    "Product"
                                                }
                                            </span>

                                            <span>
                                                Size:{" "}
                                                {
                                                    item.size ||
                                                    "N/A"
                                                }
                                            </span>

                                            <span>
                                                Qty:{" "}
                                                {
                                                    item.quantity ||
                                                    1
                                                }
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                            <div className="order-status">

                                <label>
                                    Status
                                </label>

                                <select
                                    value={
                                        order.status
                                    }
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option>
                                        Order Placed
                                    </option>

                                    <option>
                                        Packing
                                    </option>

                                    <option>
                                        Shipped
                                    </option>

                                    <option>
                                        Out for delivery
                                    </option>

                                    <option>
                                        Delivered
                                    </option>

                                </select>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Orders;