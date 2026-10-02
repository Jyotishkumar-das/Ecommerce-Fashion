const express = require("express");

const auth =
    require("../middleware/auth");

const {
    addToCart,
    updateCart,
    getCart
} = require("../controllers/cartController");

const router = express.Router();


router.post(
    "/add",
    auth,
    addToCart
);


router.post(
    "/update",
    auth,
    updateCart
);


router.get(
    "/get",
    auth,
    getCart
);


module.exports = router;