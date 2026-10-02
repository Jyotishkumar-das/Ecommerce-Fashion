import React, { useState } from "react";

const Login = ({ setIsLoggedIn }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {

        e.preventDefault();

        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";

        if (
            email === adminEmail &&
            password === adminPassword
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            localStorage.setItem(
                "adminEmail",
                email
            );

            localStorage.setItem(
                "adminPassword",
                password
            );

            setIsLoggedIn(true);

        } else {

            alert("Invalid admin email or password");

        }
    };

    return (
        <div className="admin-login-page">

            <form
                className="admin-login-form"
                onSubmit={submitHandler}
            >

                <h1>
                    FOREVER<span>.</span>
                </h1>

                <h2>Admin Panel</h2>

                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    LOGIN
                </button>

            </form>

        </div>
    );
};

export default Login;