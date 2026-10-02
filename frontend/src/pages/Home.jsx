import React, { useContext } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

import { ShopContext } from "../context/ShopContextProvider";

const Home = () => {

  const {
    products
  } = useContext(ShopContext);

  const latestProducts =
    products.slice(0, 10);

  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p>
            OUR BESTSELLERS
          </p>

          <h1>
            Latest Arrivals
          </h1>

          <button>
            SHOP NOW
          </button>

        </div>

        <div className="hero-image">

          <img
            src={assets.hero_img}
            alt="Latest Arrivals"
          />

        </div>

      </section>


      {/* LATEST COLLECTION */}

      <section className="latest">

        <Title
          text1="LATEST"
          text2="COLLECTIONS"
        />

        <p className="section-description">
          Discover our latest fashion
          collection for everyone.
        </p>

        <div className="product-grid">

          {latestProducts.map(
            (product) => (
              <ProductItem
                key={product._id}
                product={product}
              />
            )
          )}

        </div>

      </section>


      {/* POLICY */}

      <section className="policy">

        <div>
          <h3>
            Easy Exchange Policy
          </h3>

          <p>
            We offer hassle free
            exchange policy
          </p>
        </div>

        <div>
          <h3>
            7 Days Return Policy
          </h3>

          <p>
            We provide 7 days free
            return policy
          </p>
        </div>

        <div>
          <h3>
            Best Customer Support
          </h3>

          <p>
            We provide 24/7 customer
            support
          </p>
        </div>

      </section>


      {/* NEWSLETTER */}

      <section className="newsletter">

        <h2>
          Subscribe now & get 20% off
        </h2>

        <p>
          Subscribe to receive our latest
          offers and updates.
        </p>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            SUBSCRIBE
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;