const Order = require("../models/Order");


// ================= PLACE ORDER =================

const placeOrder = async (req, res) => {

    try {

        const {
            items,
            amount,
            address,
            paymentMethod
        } = req.body;


        const order = new Order({

            userId: req.userId,

            items,

            amount,

            address,

            paymentMethod,

            payment:
                paymentMethod === "COD"

        });


        await order.save();


        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= USER ORDERS =================

const userOrders = async (req, res) => {

    try {

        const orders =
            await Order.find({
                userId: req.userId
            });


        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= ALL ORDERS =================

const allOrders = async (req, res) => {

    try {

        const orders =
            await Order.find({});


        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= UPDATE STATUS =================

const updateStatus = async (req, res) => {

    try {

        const {
            orderId,
            status
        } = req.body;


        await Order.findByIdAndUpdate(
            orderId,
            {
                status
            }
        );


        res.json({
            success: true,
            message: "Order status updated"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    placeOrder,
    userOrders,
    allOrders,
    updateStatus
};