const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const Product = require("./models/Product");

dotenv.config();

const seedProducts = async () => {

    try {

        await connectDB();

        await Product.deleteMany({});

        const products = [

            // ================= PRODUCT 1 =================

            {
                name: "Women Round Neck Cotton Top",

                description:
                    "A lightweight and comfortable cotton top for everyday wear.",

                price: 100,

                image: [
                    "/images/p_img1.png"
                ],

                category: "Women",

                subCategory: "Topwear",

                sizes: [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ],

                bestseller: true
            },


            // ================= PRODUCT 2 =================

            {
                name: "Men Round Neck Cotton T-Shirt",

                description:
                    "Comfortable cotton t-shirt for casual everyday wear.",

                price: 120,

                image: [
                    "/images/p_img2.png",
                    "/images/p_img2_1.png",
                    "/images/p_img2_2.png",
                    "/images/p_img2_3.png",
                    "/images/p_img2_4.png"
                ],

                category: "Men",

                subCategory: "Topwear",

                sizes: [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ],

                bestseller: true
            },


            // ================= PRODUCT 3 =================

            {
                name: "Men Casual Shirt",

                description:
                    "Stylish casual shirt suitable for everyday use.",

                price: 150,

                image: [
                    "/images/p_img3.png"
                ],

                category: "Men",

                subCategory: "Topwear",

                sizes: [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ],

                bestseller: false
            }

        ];


        await Product.insertMany(products);


        console.log(
            "Products added successfully"
        );


        process.exit(0);


    } catch (error) {

        console.error(
            "Seed Error:",
            error.message
        );

        process.exit(1);

    }

};


seedProducts();