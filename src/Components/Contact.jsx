import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = ({ cartItems }) => {
  const form = useRef();

  // Calculate cart details and total cost as plain text
  const getCartDetails = () => {
    if (!cartItems || cartItems.length === 0) return "No items in the cart.";

    const cartDetails = cartItems.map(item => {
      return `${item.name} - Price: $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
    }).join("\n");

    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return { cartDetails, totalCost };
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const { cartDetails, totalCost } = getCartDetails();

    // Send email via EmailJS with the form data and cart details
    emailjs.sendForm(
      'service_1kxovuf',    // Your Service ID
      'template_6r4bwva',   // Your Template ID
      form.current,         // Form reference
      'OIPnX32W5GMaPK3ni'   // Your Public Key
    )
    .then(
      (result) => {
        alert("Message sent successfully! We'll get back to you shortly.");
        form.current.reset(); // Clear form after successful submission
      },
      (error) => {
        alert("Something went wrong. Please try again later.");
        console.error('Email sending error:', error.text); // Log the error
      }
    );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-description">
          We'd love to hear from you! Whether you have a question about our jewelry, shipping, or anything else, our team is ready to help.
        </p>
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
          <input type="hidden" name="cart_items" value={getCartDetails().cartDetails} />  {/* Adding cart details as plain text */}
          <input type="hidden" name="total_cost" value={getCartDetails().totalCost} />   {/* Adding total cost */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
