import React from "react";
import cream from "../assets/cream.png";
import Soap from "../assets/Soap.png";
import Product from "./Product";
function About() {
  return (
    <div className="bg-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-6">
            About Feather White
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome to our world of beauty and elegance! At Feather White, we
            believe that every individual deserves to feel confident and
            radiant. We are committed to delivering high-quality skincare and
            haircare solutions that enhance natural beauty.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our expertly formulated Fairness Range is enriched with natural
            extracts to promote a brighter, more even complexion while reducing
            dark spots and pigmentation. For healthier, stronger hair, our
            Feather White Hair Oil blends coconut, argan, hibiscus, and amla
            oils to nourish the scalp, strengthen hair from root to tip, and
            minimize hair fall.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            With a focus on innovation, purity, and effectiveness, Feather White
            empowers you to look and feel your best every day. Thank you for
            choosing us to be a part of your beauty journey!
          </p>
        </div>

        <Product />
      </div>
    </div>
  );
}


export default About;
