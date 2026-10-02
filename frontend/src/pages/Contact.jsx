import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
    return (
        <div className="contact-page">

            {/* PAGE TITLE */}
            <div className="contact-title">
                <h1>
                    CONTACT <span>US</span>
                </h1>
            </div>


            {/* CONTACT SECTION */}
            <div className="contact-container">

                {/* IMAGE */}
                <div className="contact-image">

                    <img
                        src={assets.contact_img}
                        alt="Contact Forever"
                    />

                </div>


                {/* CONTACT INFORMATION */}
                <div className="contact-info">

                    <h2>
                        Our Store
                    </h2>

                    <p>
                        123 Fashion Street
                    </p>

                    <p>
                        Bhubaneswar, Odisha, India
                    </p>


                    <h3>
                        Contact Information
                    </h3>

                    <p>
                        Phone: +91 9876543210
                    </p>

                    <p>
                        Email: contact@forever.com
                    </p>


                    <h3>
                        Get In Touch
                    </h3>

                    <p>
                        We would love to hear from you.
                        Feel free to contact us for any
                        questions or support.
                    </p>


                    <button>
                        Contact Us
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Contact;