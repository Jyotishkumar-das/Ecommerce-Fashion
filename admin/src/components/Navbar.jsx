import React from "react";

const Navbar = ({ setIsLoggedIn }) => {

    const logout = () => {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminPassword");

        setIsLoggedIn(false);
    };

    return (
        <div className="admin-navbar">

            <div className="admin-logo">
                FOREVER<span>.</span>
            </div>

            <div className="admin-navbar-right">

                <span>Admin Panel</span>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;