import React, { useState, useEffect } from "react";
import "./../styles/ContactUsSection.css";

const ContactUsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded/collapsed state
  const toggleContactForm = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsExpanded(!isExpanded);
  };

  // Collapse the form when clicking outside
  const handleClickOutside = (event) => {
    if (isExpanded && !event.target.closest(".floating-button")) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded, handleClickOutside]);

  return (
    <div
      className={`floating-button ${isExpanded ? "expanded" : ""}`}
      onClick={!isExpanded ? toggleContactForm : undefined} // Only toggle on button click when collapsed
    >
      {isExpanded ? (
        <div className="contact-content" onClick={(e) => e.stopPropagation()}>
          {/* Close "X" Button */}
          <button className="close-button" onClick={toggleContactForm}>
            X
          </button>
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
        <div>
          {/* Collapsed Button Content */}
          <img
            className="contact-icon"
            src="../assets/contact.png" /* Replace with your button image */
            alt="Contact"
          />
        </div>
      )}
    </div>
  );
};

export default ContactUsSection;
