import React, { useState } from "react";
import "./../styles/ContactUsSection.css";

const ContactUsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded/collapsed state
  const toggleContactForm = () => {
    setIsExpanded(!isExpanded);
  };

  // Prevent event propagation when interacting with the form
  const preventCollapse = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={`floating-button ${isExpanded ? "expanded" : ""}`}
        onClick={toggleContactForm}
      >
        {isExpanded ? (
          // Expandable form content
          <div className="contact-content" onClick={preventCollapse}>
            <h2>Contact Us</h2>
            <p>Have questions or need help? We are here for you!</p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </form>
          </div>
        ) : (
          // Default button text when collapsed
          <span></span>
        )}
      </div>
    </>
  );
};

export default ContactUsSection;
