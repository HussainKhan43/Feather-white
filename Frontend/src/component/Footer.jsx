import React from 'react';
import logo from "../assets/Logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white p-2 rounded mb-3">
              <img
                src={logo}
                alt="Feather White Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} MyWebsite. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 hover:text-teal-400">
              Made by Hussain Khan
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Home
              </a>
              <a
                href="/product"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Product
              </a>
              <a
                href="/about"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <div className="flex items-center space-x-2 mb-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <p className="text-gray-400 text-sm">
                Mumbai, Maharashtra
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <FaPhone className="text-gray-400" />
              <p className="text-gray-400 text-sm">+91 7977287353</p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <FaEnvelope className="text-gray-400" />
              <p className="text-gray-400 text-sm">samsungin123@gmail.com</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-center">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1EVr8R2keG/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <FaFacebook size={25} />
                </a>
                <a
                  href="https://www.instagram.com/featherwhite1983?igsh=OXB1aGlnd2ZwZmww&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <FaInstagram size={25} />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <FaYoutube size={25} />
                </a>
                <a
                  href="https://wa.link/uxcnm9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <FaWhatsapp size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
