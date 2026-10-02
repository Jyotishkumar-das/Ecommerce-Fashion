import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/assets";

const Cart = () => {

  const navigate = useNavigate();

  const {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getCartAmount,
    currency,
    delivery_fee
  } = useContext(ShopContext);


  const subtotal = getCartAmount();

  const shippingFee =
    subtotal > 0 ? delivery_fee : 0;

  const total =
    subtotal + shippingFee;


  return (

    <div className="cart-page">

      {/* ================= TITLE ================= */}

      <div className="cart-title">

        <h1>
          YOUR <span>CART</span>
        </h1>

      </div>


      {/* ================= CART ITEMS ================= */}

      <div className="cart-items">

        {Object.keys(cartItems).length === 0 ? (

          <div className="empty-cart">

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products to your cart.
            </p>

            <button
              onClick={() =>
                navigate("/collection")
              }
            >
              CONTINUE SHOPPING
            </button>

          </div>

        ) : (

          Object.keys(cartItems).map(
            (productId) => {

              const product =
                products.find(
                  (item) =>
                    item._id === productId
                );

              if (!product) {
                return null;
              }


              return Object.keys(
                cartItems[productId]
              ).map((size) => {

                const quantity =
                  cartItems[
                  productId
                  ][size];


                return (

                  <div
                    className="cart-item"
                    key={
                      productId +
                      size
                    }
                  >

                    {/* PRODUCT IMAGE */}

                    <img
                      className="cart-product-image"
                      src={
                        product.image?.[0] ||
                        product.image
                      }
                      alt={
                        product.name
                      }
                    />


                    {/* PRODUCT DETAILS */}

                    <div className="cart-product-details">

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        {currency}
                        {product.price}
                      </p>

                      <span>
                        Size: {size}
                      </span>

                    </div>


                    {/* QUANTITY */}

                    <div className="quantity-control">

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            productId,
                            size
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            productId,
                            size
                          )
                        }
                      >
                        +
                      </button>

                    </div>


                    {/* DELETE */}

                    <img
                      className="delete-icon"
                      src={
                        assets.bin_icon
                      }
                      alt="Remove"
                      onClick={() => {

                        for (
                          let i = 0;
                          i < quantity;
                          i++
                        ) {

                          removeFromCart(
                            productId,
                            size
                          );

                        }

                      }}
                    />

                  </div>

                );

              });

            }
          )

        )}

      </div>


      {/* ================= CART TOTAL ================= */}

      <div className="cart-total">

        <h2>
          CART TOTAL
        </h2>


        <div className="cart-total-row">

          <p>
            Subtotal
          </p>

          <span>
            {currency}
            {subtotal}
          </span>

        </div>


        <div className="cart-total-row">

          <p>
            Shipping Fee
          </p>

          <span>
            {currency}
            {shippingFee}
          </span>

        </div>


        <div className="cart-total-row total">

          <strong>
            Total
          </strong>

          <strong>
            {currency}
            {total}
          </strong>

        </div>


        {/* CHECKOUT */}

        <button
          onClick={() =>
            navigate("/place-order")
          }
          disabled={subtotal === 0}
        >
          PROCEED TO CHECKOUT
        </button>

      </div>

    </div>

  );
};

export default Cart;