import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://localhost:4000";

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${backendUrl}/api/order/userorders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Orders API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <h2>MY ORDERS</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="orders-page">
        <h2>MY ORDERS</h2>
        <p>Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-title">
        <h1>MY <span>ORDERS</span></h1>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (

            <div className="order-card" key={order._id}>

              <div className="order-header">
                <div>
                  <h3>Order ID</h3>
                  <p>{order._id}</p>
                </div>

                <div>
                  <h3>Date</h3>
                  <p>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="order-items">

                {order.items?.map((item, index) => (

                  <div
                    className="order-item"
                    key={index}
                  >

                    <div className="order-item-info">

                      <h4>
                        {item.name ||
                          "Product"}
                      </h4>

                      <p>
                        Size:{" "}
                        {item.size || "N/A"}
                      </p>

                      <p>
                        Quantity:{" "}
                        {item.quantity || 1}
                      </p>

                    </div>

                    <div className="order-item-price">
                      ${item.price || 0}
                    </div>

                  </div>

                ))}

              </div>

              <div className="order-footer">

                <div>
                  <strong>
                    Payment:
                  </strong>{" "}
                  {order.paymentMethod}
                </div>

                <div>
                  <strong>
                    Status:
                  </strong>{" "}
                  {order.status}
                </div>

                <div>
                  <strong>
                    Total:
                  </strong>{" "}
                  ${order.amount}
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;