import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaFacebookF, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Added new icons

const Contact = ({ cartItems }) => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  // Clear status message after some time
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
        setStatusType('');
      }, 5000); // Message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const getCartDetails = () => {
    if (!cartItems || cartItems.length === 0) {
      return { cartDetails: "კალათაში ნივთები არ არის.", totalCost: "0.00" }; // No items in the cart.
    }

    const cartDetails = cartItems.map(item => (
      `${item.name} - ფასი: $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}` // Price:
    )).join("\n");

    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return { cartDetails, totalCost };
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { cartDetails, totalCost } = getCartDetails();

    // Ensure hidden inputs are updated with latest cart details before sending
    form.current.elements.cart_items.value = cartDetails;
    form.current.elements.total_cost.value = totalCost;

    emailjs.sendForm(
      'service_1kxovuf', // Your EmailJS Service ID
      'template_6r4bwva', // Your EmailJS Template ID
      form.current,
      'OIPnX32W5GMaPK3ni' // Your EmailJS Public Key
    ).then(
      () => {
        setStatusType('success');
        setStatusMessage('შეტყობინება წარმატებით გაიგზავნა!'); // Message sent successfully!
        form.current.reset();
        // Clear status message after sending successfully to avoid persistence
        setTimeout(() => {
            setStatusMessage('');
            setStatusType('');
        }, 5000);
      },
      (error) => {
        setStatusType('error');
        setStatusMessage('რაღაც შეცდომა მოხდა. გთხოვთ, სცადოთ მოგვიანებით.'); // Something went wrong. Please try again later.
        console.error('Email error:', error.text);
      }
    );
  };

  const { cartDetails, totalCost } = getCartDetails(); // Ensure cartDetails and totalCost are available

  return (
    <section
      id="contact"
      className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans min-h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl w-full mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden md:flex">
        {/* Contact Information Section */}
        <div className="md:w-1/2 p-8 sm:p-10 bg-gradient-to-br from-green-600 to-blue-700 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide drop-shadow-md">
              დაგვიკავშირდით {/* Contact Us */}
            </h2>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              გაქვთ შეკითხვები ან გჭირდებათ რჩევა თქვენს საფეხბურთო აღჭურვილობასთან დაკავშირებით? FitForma-ს გუნდი მზადაა დაგეხმაროთ, რათა საუკეთესო თამაში ითამაშოთ.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <span>info@fitforma.ge</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl" />
                <span>+995 555 123 456</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl mt-1" />
                <span>ფეხბურთის ქუჩა #10, თბილისი, საქართველო</span> {/* Football Street #10, Tbilisi, Georgia */}
              </div>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-start items-center gap-6 mt-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ეწვიეთ ჩვენს Instagram-ს" // Visit our Instagram
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-white text-2xl hover:bg-opacity-30 transition-all transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ეწვიეთ ჩვენს Facebook-ს" // Visit our Facebook
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-white text-2xl hover:bg-opacity-30 transition-all transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ეწვიეთ ჩვენს Twitter-ს" // Visit our Twitter
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-white text-2xl hover:bg-opacity-30 transition-all transform hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            გამოგვიგზავნეთ შეტყობინება {/* Send us a Message */}
          </h3>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
            <input
              type="text"
              name="user_name"
              placeholder="თქვენი სახელი" // Your Name
              required
              className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
            />
            <input
              type="email"
              name="user_email"
              placeholder="თქვენი ელ.ფოსტა" // Your Email
              required
              className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
            />
            <textarea
              name="message"
              placeholder="თქვენი შეტყობინება" // Your Message
              rows="6"
              required
              className="p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm resize-y"
            ></textarea>

            {/* Hidden inputs for cart details */}
            <input type="hidden" name="cart_items" value={cartDetails} />
            <input type="hidden" name="total_cost" value={totalCost} />

            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 hover:scale-[1.02] transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              გაგზავნა {/* Send */}
            </button>
          </form>

          {statusMessage && (
            <p className={`mt-6 text-center text-base font-medium ${statusType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
