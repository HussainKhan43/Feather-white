import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import customer1 from '../assets/customer1.png';
import customer2 from '../assets/customer2.png';
import customer3 from '../assets/customer3.png';
import Carousel from '../component/Carousel';

function Home() {

  return (
    <> 
    <section className='bg-pink-50'>
      {/* Carousel Container */}
      <Carousel/>

      {/* Example Content Below */}
      <div className="container mx-auto py-8">
        <Product />
      </div>

      {/* Cosmetic Testimonial Section */}
      <section className="mt-12 bg-pink-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: customer1, name: 'Sophia L.', role: 'Beauty Enthusiast', quote: "I absolutely love these products! They have completely transformed my skincare routine." },
              { img: customer2, name: 'Isabella M.', role: 'Makeup Artist', quote: "These cosmetics are a game-changer! My makeup looks flawless every day." },
              { img: customer3, name: 'Olivia R.', role: 'Fashion Blogger', quote: "The quality is unmatched. I always get compliments on my look thanks to these products!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <p className="text-gray-700 italic mb-4 text-center">
                  "{testimonial.quote}"
                </p>
                <div className="text-center">
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </section>
    </>
  );
}

export default Home;
