import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post('https://api.web3forms.com/submit', {
        access_key: "cafcc8f9-5052-4b3e-a4a0-752e754c132a",
        ...formData,
      })
      .then(() => {
        toast.success("Email notification sent successfully!", { duration: 3000, position: "top-center" });
        setFormData({ name: '', phone: '', email: '', address: '', message: '' });
        setErrors({});
      })
      .catch(() => {
        toast.error("Failed to send email notification. Please try again.", { duration: 3000, position: "top-center" });
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-pink-50 shadow-2xl rounded-2xl p-10 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[ 'name', 'email', 'phone', 'address', 'message'].map((field) => (
            <div key={field}>
              <label className="block text-lg font-semibold mb-2 capitalize" htmlFor={field}>{field}</label>
              {field === 'message' ? (
                <textarea
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  rows="5"
                />
              ) : (
                <input
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                  id={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                />
              )}
              {errors[field] && (
                <p className="text-red-500 mt-2 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors">
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10 rounded-2xl shadow-2xl flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaHome className="text-3xl" />
            <p className="text-lg">support@featherwhite.in
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone className="text-3xl" />
            <p className="text-lg">+91 7977287353</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-3xl" />
            <p className="text-lg">samsungin@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
