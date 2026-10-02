import React, { useState } from "react";

const Add = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [sizes, setSizes] = useState([
        "S",
        "M",
        "L",
        "XL"
    ]);
    const [bestseller, setBestseller] = useState(false);
    const [image, setImage] = useState("");

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:4000/api/product/add",
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
                        name,
                        description,
                        price: Number(price),
                        image: [image],
                        category,
                        subCategory,
                        sizes,
                        bestseller
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(
                    "Product added successfully"
                );

                setName("");
                setDescription("");
                setPrice("");
                setImage("");
                setBestseller(false);

            } else {

                alert(
                    data.message ||
                    "Failed to add product"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to server"
            );
        }
    };

    return (
        <div className="admin-page">

            <h2>ADD PRODUCT</h2>

            <form
                className="add-product-form"
                onSubmit={submitHandler}
            >

                <label>Product Name</label>

                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <label>Description</label>

                <textarea
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />

                <label>Image Path</label>

                <input
                    type="text"
                    placeholder="/images/p_img1.png"
                    value={image}
                    onChange={(e) =>
                        setImage(e.target.value)
                    }
                    required
                />

                <label>Price</label>

                <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                    required
                />

                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >
                    <option value="Men">
                        Men
                    </option>

                    <option value="Women">
                        Women
                    </option>

                    <option value="Kids">
                        Kids
                    </option>
                </select>

                <label>Sub Category</label>

                <select
                    value={subCategory}
                    onChange={(e) =>
                        setSubCategory(e.target.value)
                    }
                >
                    <option value="Topwear">
                        Topwear
                    </option>

                    <option value="Bottomwear">
                        Bottomwear
                    </option>

                    <option value="Winterwear">
                        Winterwear
                    </option>
                </select>

                <label>Sizes</label>

                <div className="size-options">

                    {[
                        "S",
                        "M",
                        "L",
                        "XL",
                        "XXL"
                    ].map((size) => (

                        <button
                            type="button"
                            key={size}
                            className={
                                sizes.includes(size)
                                    ? "size-active"
                                    : ""
                            }
                            onClick={() => {

                                if (
                                    sizes.includes(
                                        size
                                    )
                                ) {

                                    setSizes(
                                        sizes.filter(
                                            (item) =>
                                                item !==
                                                size
                                        )
                                    );

                                } else {

                                    setSizes([
                                        ...sizes,
                                        size
                                    ]);

                                }
                            }}
                        >
                            {size}
                        </button>

                    ))}

                </div>

                <label className="checkbox-label">

                    <input
                        type="checkbox"
                        checked={bestseller}
                        onChange={(e) =>
                            setBestseller(
                                e.target.checked
                            )
                        }
                    />

                    Add to Bestseller

                </label>

                <button
                    type="submit"
                    className="submit-button"
                >
                    ADD PRODUCT
                </button>

            </form>

        </div>
    );
};

export default Add;