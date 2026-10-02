import React, {
    createContext,
    useEffect,
    useState
} from "react";

import { products as productData } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    // ================= PRODUCTS =================

    const [products, setProducts] = useState([]);


    // ================= CART =================

    const [cartItems, setCartItems] = useState({});


    // ================= TOKEN =================

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );


    // ================= SETTINGS =================

    const currency = "$";
    const delivery_fee = 10;


    // ================= LOAD PRODUCTS =================

    useEffect(() => {

        setProducts(productData);

    }, []);


    // ================= ADD TO CART =================

    const addToCart = (itemId, size) => {

        if (!size) {

            alert("Please select a size");

            return;
        }

        setCartItems((prev) => {

            const updated = {
                ...prev
            };

            // Create product if it doesn't exist
            if (!updated[itemId]) {

                updated[itemId] = {};
            }

            // Create a new object for the selected product
            updated[itemId] = {
                ...updated[itemId],
                [size]:
                    (updated[itemId][size] || 0) + 1
            };

            return updated;
        });
    };


    // ================= REMOVE FROM CART =================

    const removeFromCart = (itemId, size) => {

        setCartItems((prev) => {

            const updated = {
                ...prev
            };

            if (
                !updated[itemId] ||
                !updated[itemId][size]
            ) {

                return updated;
            }

            const productCart = {
                ...updated[itemId]
            };

            productCart[size]--;

            if (productCart[size] <= 0) {

                delete productCart[size];
            }

            if (Object.keys(productCart).length === 0) {

                delete updated[itemId];

            } else {

                updated[itemId] = productCart;
            }

            return updated;
        });
    };


    // ================= GET CART COUNT =================

    const getCartCount = () => {

        let total = 0;

        for (const productId in cartItems) {

            for (
                const size in cartItems[productId]
            ) {

                total +=
                    cartItems[productId][size];
            }
        }

        return total;
    };


    // ================= GET CART AMOUNT =================

    const getCartAmount = () => {

        let total = 0;

        for (const productId in cartItems) {

            const product = products.find(
                (item) =>
                    item._id === productId
            );

            if (!product) {
                continue;
            }

            for (
                const size in cartItems[productId]
            ) {

                total +=
                    product.price *
                    cartItems[productId][size];
            }
        }

        return total;
    };


    // ================= CONTEXT VALUE =================

    const value = {

        products,
        setProducts,

        cartItems,
        setCartItems,

        addToCart,
        removeFromCart,

        getCartCount,
        getCartAmount,

        currency,
        delivery_fee,

        token,
        setToken
    };


    return (

        <ShopContext.Provider value={value}>

            {children}

        </ShopContext.Provider>

    );
};


export default ShopContextProvider;