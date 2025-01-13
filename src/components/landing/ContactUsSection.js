import React, { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import "../../styles/ContactUsSection.css";

const ContactUsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const toggleContactForm = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (isExpanded && !event.target.closest(".floating-button")) {
        setIsExpanded(false);
      }
    },
    [isExpanded],
  );

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded, handleClickOutside]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email or contact number is missing
    if (!formData.email || !formData.contact_number) {
      setStatusMessage("Email and Contact Number are mandatory fields.");
      return;
    }

    emailjs
      .send(
        "service_3hka0bs", // Replace with your EmailJS service ID
        "template_rsrlby9", // Replace with your EmailJS template ID
        formData,
        "v13Nbs5p4JxczNQSQ", // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatusMessage("Your message has been sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          setStatusMessage("Failed to send your message. Please try again.");
        },
      );

    // Clear the form
    setFormData({ name: "", email: "", contact_number: "", message: "" });
  };

  return (
    <div
      className={`floating-button ${isExpanded ? "expanded" : ""}`}
      onClick={!isExpanded ? toggleContactForm : undefined}
    >
      {isExpanded ? (
        <div className="contact-content" onClick={(e) => e.stopPropagation()}>
          {/* Close "X" Button */}
          <button className="close-button" onClick={toggleContactForm}>
            X
          </button>
          <h2>Contact Us</h2>
          <p>Have questions or need help? We are here for you!</p>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact_number">Contact Number:</label>
              <input
                type="tel"
                id="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
                placeholder="Your Contact Number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
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
