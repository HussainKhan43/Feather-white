import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [slides, setSlides] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: "", description: "", price: "", image: null });
  const [newSlide, setNewSlide] = useState({ image: null, alt: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchSlides();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
        return;
      }
      const response = await axios.get(`${BACKEND_URL}/product/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchSlides = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
        return;
      }
      const response = await axios.get(`${BACKEND_URL}/slides/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlides(response.data || []);
    } catch (err) {
      console.error("Failed to load slides:", err);
      toast.error("Failed to load slides");
    } finally {
      setLoadingSlides(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSlideInputChange = (e) => {
    setNewSlide({ ...newSlide, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleSlideFileChange = (e) => {
    setNewSlide({ ...newSlide, image: e.target.files[0] });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);

      await axios.post(`${BACKEND_URL}/product/create`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast.success("Product created successfully!");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Failed to create product");
    }
  };
 //create slide 
  const createSlide = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to create a slide.");
        navigate("/admin/login");
        return;
      }
  
      // Check if image and alt text are provided
      if (!newSlide.image || !newSlide.alt) {
        toast.error("Please select an image and enter alt text.");
        return;
      }
  
      // Validate image type (optional, but useful)
      if (!newSlide.image.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", newSlide.image); // Append image file
      formData.append("alt", newSlide.alt);     // Append alt text
  
      // Log FormData entries for debugging
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await axios.post(`${BACKEND_URL}/slides/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Check response status
      if (response.status === 201) {
        toast.success("Slide created successfully!");
        fetchSlides(); // Refresh the slides list
        setNewSlide({ image: null, alt: "" }); // Reset the form
      } else {
        toast.error(response.data?.message || "Failed to create slide. Please try again.");
      }
    } catch (err) {
      console.error("Error creating slide:", err);
      toast.error(err.response?.data?.message || "Failed to create slide");
    }
  };
  
  
  const deleteSlide = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/slides/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Slide deleted successfully!");
      setSlides(slides.filter((slide) => slide._id !== id)); // Remove the slide from the state
    } catch (err) {
      console.error("Error deleting slide:", err);
      toast.error("Failed to delete slide");
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({ title: product.title, description: product.description, price: product.price, image: null });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      await axios.patch(`${BACKEND_URL}/product/update/${editingProduct._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully!");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };

  const resetForm = () => {
    setNewProduct({ title: "", description: "", price: "", image: null });
    setEditingProduct(null);
  };

  if (loadingProducts || loadingSlides) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      <main className="p-6">
        {/* Product Management Section */}
        <h2 className="text-2xl font-semibold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={editingProduct ? updateProduct : createProduct} className="bg-white p-4 shadow-md rounded mb-6">
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} placeholder="Title" className="border p-2 w-full mb-2" required />
          <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" className="border p-2 w-full mb-2" required />
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" className="border p-2 w-full mb-2" required />
          <input type="file" name="image" onChange={handleFileChange} className="border p-2 w-full mb-2" />

          <button type="submit" className={`px-4 py-2 rounded ${editingProduct ? "bg-yellow-500" : "bg-green-500"} text-white`}>
            {editingProduct ? "Update Product" : "Create Product"}
          </button>

          {editingProduct && (
            <button onClick={resetForm} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </form>

        {/* Product List */}
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{product._id}</td>
                  <td className="py-2 px-4 border">{product.title}</td>
                  <td className="py-2 px-4 border">${product.price}</td>
                  <td className="py-2 px-4 border flex flex-wrap gap-2">
                    <button onClick={() => startEditing(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Carousel Management Section */}
        <h2 className="text-2xl font-semibold mb-4 mt-8">Carousel Slides</h2>
        <form onSubmit={createSlide} className="bg-white p-4 shadow-md rounded mb-6">
          <input type="text" name="alt" value={newSlide.alt} onChange={handleSlideInputChange} placeholder="Alt Text" className="border p-2 w-full mb-2" required />
          <input 
  type="file" 
  accept="image/*" 
  onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })} 
/>


          <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white">
            Create Slide
          </button>
        </form>

        {/* Carousel Slides List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Alt Text</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{slide._id}</td>
                  <td className="py-2 px-4 border">
                    <img src={slide.image} alt={slide.alt} className="w-20 h-10 object-cover" />
                  </td>
                  <td className="py-2 px-4 border">{slide.alt}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => deleteSlide(slide._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;