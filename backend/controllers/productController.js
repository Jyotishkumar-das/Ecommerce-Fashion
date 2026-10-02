const Product = require("../models/Product");


// ================= GET PRODUCTS =================

const listProducts = async (req, res) => {

    try {

        const products =
            await Product.find({});

        res.json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= GET SINGLE PRODUCT =================

const singleProduct = async (req, res) => {

    try {

        const {
            productId
        } = req.body;


        const product =
            await Product.findById(productId);


        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        res.json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= ADD PRODUCT =================

const addProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            image,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;


        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            subCategory,
            sizes,
            bestseller
        });


        await product.save();


        res.json({
            success: true,
            message: "Product added successfully"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= REMOVE PRODUCT =================

const removeProduct = async (req, res) => {

    try {

        const {
            id
        } = req.body;


        await Product.findByIdAndDelete(id);


        res.json({
            success: true,
            message: "Product removed successfully"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    listProducts,
    singleProduct,
    addProduct,
    removeProduct
};