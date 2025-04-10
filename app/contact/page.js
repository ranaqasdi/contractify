"use client"
import React, { useState } from 'react'

export default function page() {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://gold-hawk-364161.hostingersite.com/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send: " + result.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred while sending.");
    }
  };


  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
    <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          name="name"
          type="text"
          placeholder='Enter Your Name Here'
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 border rounded-md shadow-sm py-4 px-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Your Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter Your Email Here'
          required
          className="mt-1 block w-full border-gray-300 border rounded-md shadow-sm py-4 px-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder='Enter Your Message Here'
          rows="5"
          required
          className="mt-1 block w-full border-gray-300 border rounded-md shadow-sm py-4 px-2"
        ></textarea>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Send Message
      </button>
    </form>

    {status && <p className="mt-4 text-center text-lg text-gray-700">{status}</p>}
  </div>
  )
}
