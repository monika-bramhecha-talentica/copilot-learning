import { useState } from "react";
import "./WelcomeForm.css";

function WelcomeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-form-container">
      <h2>Get in Touch</h2>
      <form className="welcome-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message..."
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>

      {status && (
        <div className={`alert alert-${status}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default WelcomeForm;
