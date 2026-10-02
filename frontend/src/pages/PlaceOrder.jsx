import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    products,
    cartItems,
    getCartAmount,
    currency,
    delivery_fee,
    setCartItems
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // ===============================
      // CREATE ORDER ITEMS
      // ===============================

      const orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {

          const quantity =
            cartItems[productId][size];

          if (quantity > 0) {

            const product = products.find(
              (item) =>
                item._id === productId
            );

            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity
              });
            }
          }
        }
      }

      if (orderItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // ===============================
      // ADDRESS
      // ===============================

      const address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
        phone: formData.phone
      };

      // ===============================
      // PAYMENT METHOD
      // ===============================

      let selectedPaymentMethod = "Cash on Delivery";

      if (paymentMethod === "stripe") {
        selectedPaymentMethod = "Stripe";
      }

      if (paymentMethod === "razorpay") {
        selectedPaymentMethod = "Razorpay";
      }

      // ===============================
      // ORDER DATA
      // ===============================

      const orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: address,
        paymentMethod: selectedPaymentMethod
      };

      console.log("Sending Order:", orderData);

      // ===============================
      // SEND ORDER TO BACKEND
      // ===============================

      const response = await fetch(
        "http://localhost:4000/api/order/place",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(orderData)
        }
      );

      const data = await response.json();

      console.log("Order API Response:", data);

      if (!response.ok || !data.success) {
        alert(
          data.message ||
          "Failed to place order"
        );
        return;
      }

      // ===============================
      // CLEAR CART
      // ===============================

      setCartItems({});

      alert("Order placed successfully!");

      // ===============================
      // GO TO ORDERS
      // ===============================

      navigate("/orders");

    } catch (error) {

      console.error(
        "Place Order Error:",
        error
      );

      alert(
        "Unable to connect to server"
      );

    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className="place-order">

      {/* ===============================
                LEFT SIDE
            =============================== */}

      <div className="delivery-section">

        <div className="section-title">
          <h2>
            DELIVERY{" "}
            <span>INFORMATION</span>
          </h2>
        </div>

        <div className="name-fields">

          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <div className="name-fields">

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />

        </div>

        <div className="name-fields">

          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

      </div>

      {/* ===============================
                RIGHT SIDE
            =============================== */}

      <div className="order-section">

        {/* CART TOTAL */}

        <div className="place-order-total">

          <div className="section-title">
            <h2>
              CART <span>TOTAL</span>
            </h2>
          </div>

          <div className="total-row">

            <p>Subtotal</p>

            <p>
              {currency}
              {subtotal}
            </p>

          </div>

          <div className="total-row">

            <p>Shipping Fee</p>

            <p>
              {currency}
              {delivery_fee}
            </p>

          </div>

          <div className="total-row final-total">

            <strong>Total</strong>

            <strong>
              {currency}
              {total}
            </strong>

          </div>

        </div>

        {/* PAYMENT METHOD */}

        <div className="payment-section">

          <div className="section-title">

            <h2>
              PAYMENT{" "}
              <span>METHOD</span>
            </h2>

          </div>

          <div className="payment-options">

            {/* STRIPE */}

            <div
              className={`payment-option ${paymentMethod === "stripe"
                  ? "selected"
                  : ""
                }`}
              onClick={() =>
                setPaymentMethod(
                  "stripe"
                )
              }
            >

              <span className="radio">
                {paymentMethod ===
                  "stripe" && "●"}
              </span>

              <img
                src={
                  assets.stripe_logo
                }
                alt="Stripe"
              />

              <span>Stripe</span>

            </div>

            {/* RAZORPAY */}

            <div
              className={`payment-option ${paymentMethod ===
                  "razorpay"
                  ? "selected"
                  : ""
                }`}
              onClick={() =>
                setPaymentMethod(
                  "razorpay"
                )
              }
            >

              <span className="radio">
                {paymentMethod ===
                  "razorpay" && "●"}
              </span>

              <img
                src={
                  assets.razorpay_logo
                }
                alt="Razorpay"
              />

              <span>Razorpay</span>

            </div>

            {/* COD */}

            <div
              className={`payment-option ${paymentMethod === "cod"
                  ? "selected"
                  : ""
                }`}
              onClick={() =>
                setPaymentMethod("cod")
              }
            >

              <span className="radio">
                {paymentMethod ===
                  "cod" && "●"}
              </span>

              <span>
                Cash on Delivery
              </span>

            </div>

          </div>

        </div>

        {/* PLACE ORDER */}

        <button
          className="place-order-btn"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "PLACING ORDER..."
            : "PLACE ORDER"}
        </button>

      </div>

    </div>
  );
};

export default PlaceOrder;