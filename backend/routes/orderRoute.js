const express = require("express");

const auth =
    require("../middleware/auth");

const adminAuth =
    require("../middleware/adminAuth");

const {
    placeOrder,
    userOrders,
    allOrders,
    updateStatus
} = require("../controllers/orderController");

const router = express.Router();


router.post(
    "/place",
    auth,
    placeOrder
);


router.get(
    "/userorders",
    auth,
    userOrders
);


router.get(
    "/list",
    adminAuth,
    allOrders
);


router.post(
    "/status",
    adminAuth,
    updateStatus
);


module.exports = router;