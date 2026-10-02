const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const Product = require("./models/Product");

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();

        // Remove old products
        await Product.deleteMany({});

        const products = [

            // 1
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 100,
                image: ["/images/p_img1.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L"],
                bestseller: true
            },

            // 2
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 200,
                image: [
                    "/images/p_img2_1.png",
                    "/images/p_img2_2.png",
                    "/images/p_img2_3.png",
                    "/images/p_img2_4.png"
                ],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["M", "L", "XL"],
                bestseller: true
            },

            // 3
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 220,
                image: ["/images/p_img3.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "L", "XL"],
                bestseller: true
            },

            // 4
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 110,
                image: ["/images/p_img4.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "XXL"],
                bestseller: true
            },

            // 5
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 130,
                image: ["/images/p_img5.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["M", "L", "XL"],
                bestseller: true
            },

            // 6
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 140,
                image: ["/images/p_img6.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "L", "XL"],
                bestseller: true
            },

            // 7
            {
                name: "Men Tapered Fit Flat-Front Trousers",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 190,
                image: ["/images/p_img7.png"],
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "L", "XL"],
                bestseller: false
            },

            // 8
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 140,
                image: ["/images/p_img8.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 9
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 100,
                image: ["/images/p_img9.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["M", "L", "XL"],
                bestseller: false
            },

            // 10
            {
                name: "Men Tapered Fit Flat-Front Trousers",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 110,
                image: ["/images/p_img10.png"],
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "L", "XL"],
                bestseller: false
            },

            // 11
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 120,
                image: ["/images/p_img11.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L"],
                bestseller: false
            },

            // 12
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 150,
                image: ["/images/p_img12.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 13
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 130,
                image: ["/images/p_img13.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 14
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 160,
                image: ["/images/p_img14.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 15
            {
                name: "Men Tapered Fit Flat-Front Trousers",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 140,
                image: ["/images/p_img15.png"],
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 16
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 170,
                image: ["/images/p_img16.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 17
            {
                name: "Men Tapered Fit Flat-Front Trousers",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 150,
                image: ["/images/p_img17.png"],
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 18
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 180,
                image: ["/images/p_img18.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 19
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 160,
                image: ["/images/p_img19.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 20
            {
                name: "Women Palazzo Pants with Waist Belt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 190,
                image: ["/images/p_img20.png"],
                category: "Women",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 21
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 170,
                image: ["/images/p_img21.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 22
            {
                name: "Women Palazzo Pants with Waist Belt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 200,
                image: ["/images/p_img22.png"],
                category: "Women",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 23
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 180,
                image: ["/images/p_img23.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 24
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 210,
                image: ["/images/p_img24.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 25
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 190,
                image: ["/images/p_img25.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 26
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 220,
                image: ["/images/p_img26.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 27
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 200,
                image: ["/images/p_img27.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 28
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 230,
                image: ["/images/p_img28.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 29
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 210,
                image: ["/images/p_img29.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 30
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 240,
                image: ["/images/p_img30.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 31
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 220,
                image: ["/images/p_img31.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 32
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 250,
                image: ["/images/p_img32.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 33
            {
                name: "Girls Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 230,
                image: ["/images/p_img33.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 34
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 260,
                image: ["/images/p_img34.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 35
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 240,
                image: ["/images/p_img35.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 36
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 270,
                image: ["/images/p_img36.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 37
            {
                name: "Women Round Neck Cotton Top",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 250,
                image: ["/images/p_img37.png"],
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 38
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 280,
                image: ["/images/p_img38.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 39
            {
                name: "Men Printed Plain Cotton Shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 260,
                image: ["/images/p_img39.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 40
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 290,
                image: ["/images/p_img40.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 41
            {
                name: "Men Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 270,
                image: ["/images/p_img41.png"],
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 42
            {
                name: "Boy Round Neck Pure Cotton T-shirt",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 300,
                image: ["/images/p_img42.png"],
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 43
            {
                name: "Kid Tapered Slim Fit Trouser",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 280,
                image: ["/images/p_img43.png"],
                category: "Kids",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 44
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 310,
                image: ["/images/p_img44.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 45
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 290,
                image: ["/images/p_img45.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 46
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 320,
                image: ["/images/p_img46.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 47
            {
                name: "Kid Tapered Slim Fit Trouser",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 300,
                image: ["/images/p_img47.png"],
                category: "Kids",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 48
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 330,
                image: ["/images/p_img48.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 49
            {
                name: "Kid Tapered Slim Fit Trouser",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 310,
                image: ["/images/p_img49.png"],
                category: "Kids",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 50
            {
                name: "Kid Tapered Slim Fit Trouser",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 340,
                image: ["/images/p_img50.png"],
                category: "Kids",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 51
            {
                name: "Women Zip-Front Relaxed Fit Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 320,
                image: ["/images/p_img51.png"],
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            },

            // 52
            {
                name: "Men Slim Fit Relaxed Denim Jacket",
                description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
                price: 350,
                image: ["/images/p_img52.png"],
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                bestseller: false
            }
        ];

        await Product.insertMany(products);

        console.log(`${products.length} products added successfully`);

        process.exit(0);

    } catch (error) {

        console.error("Seed Error:", error.message);

        process.exit(1);
    }
};

seedProducts();