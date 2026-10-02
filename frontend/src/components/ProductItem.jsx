import React from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";

const ProductItem = ({ product }) => {

    const {
        currency
    } = useContext(ShopContext);

    return (
        <div className="product-card">

            <Link
                to={`/product/${product._id}`}
            >

                <div className="product-image">

                    <img
                        src={
                            product.image?.[0] ||
                            product.image
                        }
                        alt={product.name}
                    />

                </div>

                <div className="product-info">

                    <p className="product-name">
                        {product.name}
                    </p>

                    <p className="product-price">
                        {currency}
                        {product.price}
                    </p>

                </div>

            </Link>

        </div>
    );
};

export default ProductItem;