const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/mongodb");

// ================= ROUTES =================

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= DATABASE =================

connectDB();


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.send("FOREVER E-commerce Backend is Running");
});


// ================= API ROUTES =================

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);


// ================= FAVICON =================

app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
});


// ================= PORT =================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});