import React from "react";
import "../styles/ContactUsSection.css";

function ContactUsSection() {
  return (
    <section className="contact-us">
      <h2>Contact Us</h2>
      <p>Reach out to us for more information or to get a quote!</p>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ContactUsSection;
