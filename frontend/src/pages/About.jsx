import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="about-page">

      {/* TITLE */}
      <div className="about-title">
        <h1>
          ABOUT <span>FOREVER</span>
        </h1>
      </div>


      {/* ABOUT SECTION */}
      <div className="about-container">

        {/* IMAGE */}
        <div className="about-image">
          <img
            src={assets.about_img}
            alt="About Forever"
          />
        </div>


        {/* CONTENT */}
        <div className="about-content">

          <h2>
            We Believe In Quality
          </h2>

          <p>
            Welcome to FOREVER, your destination for
            modern and stylish fashion. We are committed
            to providing high-quality clothing that combines
            comfort, style and affordability.
          </p>

          <p>
            Our collection is carefully selected to bring
            you the latest fashion trends for men, women
            and kids.
          </p>

          <h3>
            Our Mission
          </h3>

          <p>
            Our mission is to make fashion accessible to
            everyone while providing an excellent shopping
            experience.
          </p>

        </div>

      </div>

    </div>
  );
};

export default About;