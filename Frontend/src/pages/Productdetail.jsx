import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/product/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">No product found.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4 bg-pink-50">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Product Details</span>
      </nav>

      {product.category && (
        <div className="text-blue-500 uppercase text-xs font-bold mb-4">
          {product.category}
        </div>
      )}
      <h1 className="text-4xl font-bold mb-6  text-blue-900">
        {product.product.title || "No title available"}
      </h1>
      <div className="flex flex-col md:flex-row">
        {product.product.image?.url ? (
          <img
            src={product.product.image.url}
            alt={product.product.title || "Product image"}
            className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
          />
        ) : (
          <div className="md:w-1/2 w-full h-[500px] mb-6 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg border">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
        <div className="md:w-1/2 w-full md:pl-6">
          <p className="text-lg mb-6">
            {product.product.description || "No description available"}
          </p>
          <div className="text-2xl font-bold  text-blue-900">
            {product.product.price !== undefined ? `INR ${product.product.price}` : "Price not available"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
