import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css"; // Import CSS module

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://mapview-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/"); // Redirect to login page
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Create an Account</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className={styles.input} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={styles.input} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className={styles.input} />
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <p className={styles.redirectText}>
          Already have an account? <a href="/" className={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
