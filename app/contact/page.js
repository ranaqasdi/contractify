"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "https://violet-stork-183808.hostingersite.com/contact.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("Message sent successfully!");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setStatus(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="bg-[#f9f6ff] -mt-7">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-[#5d17eb] mb-4">Let's Talk</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form and we'll get back to you within 24 hours.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 pb-20">
        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#5d17eb]">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full border-gray-300 border rounded-lg py-4 px-4 shadow-sm"
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
                placeholder="john@example.com"
                required
                className="mt-1 w-full border-gray-300 border rounded-lg py-4 px-4 shadow-sm"
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
                placeholder="How can we help you?"
                rows="5"
                required
                className="mt-1 w-full border-gray-300 border rounded-lg py-4 px-4 shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5d17eb] hover:bg-[#4313c3] text-white py-3 rounded-lg text-lg font-semibold shadow"
            >
              Send Message
            </button>
          </form>

          {status && <p className="mt-4 text-center text-[#5d17eb] font-medium">{status}</p>}
        </div>

        {/* Info Panel */}
        <div className="bg-[#5d17eb] text-white p-8 rounded-xl shadow-md flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Contact Information</h3>
          
          <p className="mb-4 text-white">✉️ info@templik.com</p>
          <div className="mt-6 space-x-4">
            <a href="https://www.facebook.com/share/18oghwwZyE/?mibextid=wwXIfr" className="inline-block bg-white text-[#5d17eb] px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100">Facebook</a>
            <a href="https://www.instagram.com/usetemplik" className="inline-block bg-white text-[#5d17eb] px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100">Instagram</a>
          </div>
        </div>
      </section>



      {/* CTA Footer */}
      <section className="bg-[#f0eaff] py-32 text-center px-6">
        <h2 className="text-3xl font-bold text-[#5d17eb] mb-4">Ready to Simplify Your Paperwork?</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Effortless, professional documents for freelancers, startups, and businesses. Save time, money, and avoid legal stress—start now.
        </p>
        <Link
          href="/forms"
          className="inline-block bg-[#5d17eb] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#4313c3] shadow-md"
        >
           Start for Free
        </Link>
      </section>
    </div>
  );
}
