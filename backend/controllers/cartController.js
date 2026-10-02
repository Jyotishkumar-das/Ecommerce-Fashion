const User = require("../models/User");


// ================= ADD TO CART =================

const addToCart = async (req, res) => {

    try {

        const {
            itemId,
            size
        } = req.body;


        const user =
            await User.findById(req.userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        const cartData =
            user.cartData || {};


        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }


        cartData[itemId][size] =
            (cartData[itemId][size] || 0) + 1;


        user.cartData = cartData;


        await user.save();


        res.json({
            success: true,
            message: "Product added to cart"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= UPDATE CART =================

const updateCart = async (req, res) => {

    try {

        const {
            itemId,
            size,
            quantity
        } = req.body;


        const user =
            await User.findById(req.userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        const cartData =
            user.cartData || {};


        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }


        if (quantity <= 0) {

            delete cartData[itemId][size];

        } else {

            cartData[itemId][size] =
                quantity;

        }


        user.cartData = cartData;


        await user.save();


        res.json({
            success: true,
            message: "Cart updated"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= GET CART =================

const getCart = async (req, res) => {

    try {

        const user =
            await User.findById(req.userId);


        res.json({
            success: true,
            cartData: user.cartData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    addToCart,
    updateCart,
    getCart
};