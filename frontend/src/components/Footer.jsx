import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="footer">

            <div className="footer-brand">

                <h2>
                    FOREVER<span>.</span>
                </h2>

                <p>
                    Forever is your destination for
                    modern fashion and quality clothing.
                    Discover our latest collections
                    and shop your favorite styles.
                </p>

            </div>


            <div className="footer-company">

                <h3>
                    COMPANY
                </h3>

                <Link to="/">
                    Home
                </Link>

                <Link to="/about">
                    About us
                </Link>

                <Link to="/contact">
                    Contact
                </Link>

                <Link to="/collection">
                    Collection
                </Link>

            </div>


            <div className="footer-contact">

                <h3>
                    GET IN TOUCH
                </h3>

                <p>
                    +91 9876543210
                </p>

                <p>
                    contact@forever.com
                </p>

            </div>

        </footer>
    );
};

export default Footer;