const express = require("express");

const {
    listProducts,
    singleProduct,
    addProduct,
    removeProduct
} = require("../controllers/productController");

const adminAuth =
    require("../middleware/adminAuth");

const router = express.Router();


router.get(
    "/list",
    listProducts
);


router.post(
    "/single",
    singleProduct
);


router.post(
    "/add",
    adminAuth,
    addProduct
);


router.post(
    "/remove",
    adminAuth,
    removeProduct
);


module.exports = router;