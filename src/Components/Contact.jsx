import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1kxovuf',       // Replace with your actual Service ID
      'template_6r4bwva',      // Replace with your actual Template ID
      form.current,
      'OIPnX32W5GMaPK3ni'        // Replace with your actual Public Key
    )
    .then(
      (result) => {
        alert("Message sent successfully!");
        form.current.reset(); // Clear the form
      },
      (error) => {
        alert("Something went wrong. Please try again.");
        console.error(error.text);
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
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
