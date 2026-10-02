import React, {
    useContext,
    useState
} from "react";

import { useParams } from "react-router-dom";

import { assets } from "../assets/assets";

import {
    ShopContext
} from "../context/ShopContextProvider";


const Product = () => {

    // ================= PRODUCT ID =================

    const { productId } = useParams();


    // ================= SHOP CONTEXT =================

    const {
        products,
        currency,
        addToCart
    } = useContext(ShopContext);


    // ================= STATE =================

    const [selectedImage, setSelectedImage] =
        useState(0);

    const [selectedSize, setSelectedSize] =
        useState("");


    // ================= FIND PRODUCT =================

    const product = products.find(
        (item) =>
            item._id === productId
    );


    // ================= PRODUCT NOT FOUND =================

    if (!product) {

        return (
            <div className="product-not-found">

                <h2>
                    Product not found
                </h2>

            </div>
        );
    }


    // ================= PRODUCT IMAGES =================

    const productImages =
        product.image || [];


    // ================= PRODUCT SIZES =================

    const productSizes =
        product.sizes || [];


    // ================= ADD TO CART =================

    const handleAddToCart = () => {

        if (!selectedSize) {

            alert("Please select a size");

            return;
        }

        addToCart(
            product._id,
            selectedSize
        );

    };


    // ================= RETURN =================

    return (

        <div className="product-page">


            {/* ================= IMAGES ================= */}

            <div className="product-images">


                {/* THUMBNAILS */}

                <div className="product-thumbnails">

                    {productImages.map(
                        (image, index) => (

                            <img
                                key={index}
                                src={image}
                                alt={
                                    `${product.name} ${index + 1}`
                                }
                                className={
                                    selectedImage === index
                                        ? "thumbnail active"
                                        : "thumbnail"
                                }
                                onClick={() =>
                                    setSelectedImage(index)
                                }
                            />

                        )
                    )}

                </div>


                {/* MAIN IMAGE */}

                <div className="main-product-image">

                    {productImages.length > 0 && (

                        <img
                            src={
                                productImages[
                                selectedImage
                                ]
                            }
                            alt={product.name}
                        />

                    )}

                </div>

            </div>


            {/* ================= PRODUCT DETAILS ================= */}

            <div className="product-details">


                {/* PRODUCT NAME */}

                <h1>
                    {product.name}
                </h1>


                {/* RATING */}

                <div className="product-rating">

                    <img
                        src={assets.star_icon}
                        alt="star"
                    />

                    <img
                        src={assets.star_icon}
                        alt="star"
                    />

                    <img
                        src={assets.star_icon}
                        alt="star"
                    />

                    <img
                        src={assets.star_icon}
                        alt="star"
                    />

                    <img
                        src={assets.star_dull_icon}
                        alt="star"
                    />

                    <span>
                        (4)
                    </span>

                </div>


                {/* PRICE */}

                <p className="product-price">

                    {currency}
                    {product.price}

                </p>


                {/* DESCRIPTION */}

                <p className="product-description">

                    {product.description}

                </p>


                {/* SIZE */}

                <div className="product-size">

                    <p>
                        Select Size
                    </p>


                    <div className="size-options">

                        {productSizes.map(
                            (size) => (

                                <button
                                    key={size}
                                    type="button"
                                    className={
                                        selectedSize === size
                                            ? "size-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedSize(size)
                                    }
                                >
                                    {size}
                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* ADD TO CART */}

                <button
                    type="button"
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </button>


                {/* PRODUCT INFORMATION */}

                <div className="product-info">

                    <p>
                        ✓ 100% Original Product
                    </p>

                    <p>
                        ✓ Cash on Delivery Available
                    </p>

                    <p>
                        ✓ Easy 7 Days Return & Exchange
                    </p>

                </div>

            </div>

        </div>
    );
};


export default Product;