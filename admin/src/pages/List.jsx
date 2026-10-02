import React, { useEffect, useState } from "react";

const List = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:4000/api/product/list"
            );

            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const removeProduct = async (productId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:4000/api/product/remove",
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
                        id: productId
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(
                    "Product removed successfully"
                );

                fetchProducts();

            } else {

                alert(
                    data.message ||
                    "Failed to remove product"
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
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="admin-page">
                <h2>PRODUCT LIST</h2>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="admin-page">

            <h2>PRODUCT LIST</h2>

            <div className="product-table">

                <div className="product-table-header">

                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Action</span>

                </div>

                {products.map((product) => (

                    <div
                        className="product-row"
                        key={product._id}
                    >

                        <div>

                            {product.image?.[0] && (
                                <img
                                    src={
                                        product.image[0]
                                    }
                                    alt={
                                        product.name
                                    }
                                />
                            )}

                        </div>

                        <span>
                            {product.name}
                        </span>

                        <span>
                            {product.category}
                        </span>

                        <span>
                            ${product.price}
                        </span>

                        <button
                            onClick={() =>
                                removeProduct(
                                    product._id
                                )
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default List;