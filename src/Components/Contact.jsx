import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Contact = ({ cartItems }) => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const getCartDetails = () => {
    if (!cartItems || cartItems.length === 0) {
      return { cartDetails: "No items in the cart.", totalCost: "0.00" };
    }

    const cartDetails = cartItems.map(item => (
      `${item.name} - Price: $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
    )).join("\n");

    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return { cartDetails, totalCost };
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { cartDetails, totalCost } = getCartDetails();

    emailjs.sendForm(
      'service_1kxovuf',
      'template_6r4bwva',
      form.current,
      'OIPnX32W5GMaPK3ni'
    ).then(
      () => {
        setStatusType('success');
        setStatusMessage('Message sent successfully!');
        form.current.reset();
      },
      (error) => {
        setStatusType('error');
        setStatusMessage('Something went wrong. Please try again later.');
        console.error('Email error:', error.text);
      }
    );
  };

  const { cartDetails, totalCost } = getCartDetails();

  return (
    <section
      id="contact"
      className="pt-24 py-16 px-6 bg-[#fff7f4] dark:bg-gray-900 text-[#333] dark:text-gray-100 text-center font-sans"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-[2.5rem] text-[#b48b6c] dark:text-[#ddbfa9] mb-6 font-semibold">
          Get in Touch
        </h2>
        <p className="text-[1.1rem] leading-7 mb-8 text-gray-700 dark:text-gray-300">
          We'd love to hear from you! Whether you have a question about our jewelry, shipping, or anything else, our team is ready to help.
        </p>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-800 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b48b6c]/30 focus:border-[#b48b6c] transition-all"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-800 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b48b6c]/30 focus:border-[#b48b6c] transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-800 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b48b6c]/30 focus:border-[#b48b6c] transition-all"
          ></textarea>

          <input type="hidden" name="cart_items" value={cartDetails} />
          <input type="hidden" name="total_cost" value={totalCost} />

          <button
            type="submit"
            className="bg-gradient-to-br from-[#c89f9c] to-[#b48b6c] text-white py-3 rounded-xl font-semibold text-base transition-transform transform hover:scale-105 hover:from-[#b48b6c] hover:to-[#a7775e]"
          >
            Send Message
          </button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <p className={`mt-4 text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {statusMessage}
          </p>
        )}

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-5 mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#b48b6c] text-white text-xl hover:bg-[#a7775e] transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#b48b6c] text-white text-xl hover:bg-[#a7775e] transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Twitter"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#b48b6c] text-white text-xl hover:bg-[#a7775e] transition-colors"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
