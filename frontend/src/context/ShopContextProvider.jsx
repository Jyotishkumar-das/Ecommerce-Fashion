import React, {
    createContext,
    useEffect,
    useState
} from "react";

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


    // ================= BACKEND URL =================

    const backendUrl =
        import.meta.env.VITE_API_URL || "http://localhost:4000";


    // ================= LOAD PRODUCTS =================

    const getProducts = async () => {

        try {

            const response = await fetch(
                `${backendUrl}/api/product/list`
            );

            const data = await response.json();

            if (data.success) {

                setProducts(data.products);

            } else {

                console.log(
                    "Product Error:",
                    data.message
                );
            }

        } catch (error) {

            console.log(
                "Product API Error:",
                error
            );
        }
    };


    useEffect(() => {

        getProducts();

    }, []);


    // ================= ADD TO CART =================

    const addToCart = async (itemId, size) => {

        if (!size) {

            alert("Please select a size");

            return;
        }


        // Update local cart

        setCartItems((prev) => {

            const updated = {
                ...prev
            };

            if (!updated[itemId]) {

                updated[itemId] = {};
            }

            updated[itemId] = {

                ...updated[itemId],

                [size]:
                    (updated[itemId][size] || 0) + 1
            };

            return updated;
        });


        // Update backend cart

        if (token) {

            try {

                await fetch(
                    `${backendUrl}/api/cart/add`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            itemId,
                            size
                        })
                    }
                );

            } catch (error) {

                console.log(
                    "Add cart API Error:",
                    error
                );
            }
        }
    };


    // ================= REMOVE FROM CART =================

    const removeFromCart = async (itemId, size) => {

        let newQuantity = 0;


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

            newQuantity =
                productCart[size];

            if (productCart[size] <= 0) {

                delete productCart[size];

                newQuantity = 0;
            }


            if (
                Object.keys(productCart).length === 0
            ) {

                delete updated[itemId];

            } else {

                updated[itemId] = productCart;
            }


            return updated;
        });


        // Update backend cart

        if (token) {

            try {

                await fetch(
                    `${backendUrl}/api/cart/update`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            itemId,
                            size,
                            quantity: newQuantity
                        })
                    }
                );

            } catch (error) {

                console.log(
                    "Remove cart API Error:",
                    error
                );
            }
        }
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