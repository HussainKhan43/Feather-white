import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from "../utils/utils";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API on component mount.
  useEffect(() => {
    fetch(`${BACKEND_URL}/product/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-pink-50">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-900">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {products.length === 0 ? (
          <div className="text-center col-span-3 text-gray-500">
            No products found
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-64 bg-gray-200">
                <img
                  src={product?.image?.url || 'https://picsum.photos/400/300'}
                  alt={product?.title || 'Product image'}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-base mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    INR {product.price}
                  </span>
                  <Link to={`/product/${product._id}`}>
                    <button className="bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;