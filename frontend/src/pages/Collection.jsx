import React, {
  useContext,
  useState
} from "react";

import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

import { ShopContext } from "../context/ShopContextProvider";

const Collection = () => {

  const {
    products
  } = useContext(ShopContext);

  const [category, setCategory] =
    useState([]);

  const [type, setType] =
    useState([]);

  const toggleValue = (
    value,
    state,
    setState
  ) => {

    if (state.includes(value)) {

      setState(
        state.filter(
          item => item !== value
        )
      );

    } else {

      setState([
        ...state,
        value
      ]);

    }
  };

  const filteredProducts =
    products.filter(product => {

      const categoryMatch =
        category.length === 0 ||
        category.includes(product.category);

      const typeMatch =
        type.length === 0 ||
        type.includes(product.subCategory);

      return categoryMatch && typeMatch;
    });

  return (
    <div className="collection-page">

      <aside className="filters">

        <h3>FILTERS</h3>

        <div className="filter-box">

          <h4>CATEGORIES</h4>

          {["Men", "Women", "Kids"].map(
            item => (

              <label key={item}>

                <input
                  type="checkbox"
                  checked={
                    category.includes(item)
                  }
                  onChange={() =>
                    toggleValue(
                      item,
                      category,
                      setCategory
                    )
                  }
                />

                {item}

              </label>
            )
          )}

        </div>


        <div className="filter-box">

          <h4>TYPE</h4>

          {[
            "Topwear",
            "Bottomwear",
            "Winterwear"
          ].map(item => (

            <label key={item}>

              <input
                type="checkbox"
                checked={
                  type.includes(item)
                }
                onChange={() =>
                  toggleValue(
                    item,
                    type,
                    setType
                  )
                }
              />

              {item}

            </label>
          ))}

        </div>

      </aside>


      <section className="collection-products">

        <div className="collection-header">

          <Title
            text1="ALL"
            text2="COLLECTIONS"
          />

          <select>
            <option>
              Sort by: Relevant
            </option>

            <option>
              Price: Low to High
            </option>

            <option>
              Price: High to Low
            </option>
          </select>

        </div>


        <div className="product-grid">

          {filteredProducts.map(
            product => (
              <ProductItem
                key={product._id}
                product={product}
              />
            )
          )}

        </div>

      </section>

    </div>
  );
};

export default Collection;