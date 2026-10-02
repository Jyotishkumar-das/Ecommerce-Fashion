const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashedPassword
        });


        await user.save();


        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            success: true,
            token
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });

        }


        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            success: true,
            token
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ================= EXPORT =================

module.exports = {
    registerUser,
    loginUser
};