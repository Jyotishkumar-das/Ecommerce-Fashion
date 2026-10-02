const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        items: {
            type: Array,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        address: {
            type: Object,
            required: true
        },

        paymentMethod: {
            type: String,
            required: true
        },

        payment: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            default: "Order Placed"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model(
    "Order",
    orderSchema
);

module.exports = Order;