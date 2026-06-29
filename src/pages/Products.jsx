import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../services/productService";
import "./category.css";
export default function Products() {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category, subcategory]);

  const loadProducts = async () => {
    try {
      const data = await getProductsByCategory(
        decodeURIComponent(category),
        decodeURIComponent(subcategory)
      );

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <h2>Loading...</h2>
      </div>
    );
  }
console.log(JSON.stringify(products, null, 2));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container section"
    >
      <h2>{decodeURIComponent(subcategory)}</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="pcard-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}