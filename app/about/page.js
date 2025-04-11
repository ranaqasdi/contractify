"use client"
import React from 'react'

export default function page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-lg mb-4">
        We’re on a mission to make professional documents easy, accessible, and
        stress-free for everyone — from freelancers and startups to growing
        businesses and individuals. Our platform offers a seamless way to create,
        customize, and download essential documents, saving you time, money, and
        legal headaches.
      </p>

      <p className="text-lg mb-4">
        Whether you're sealing a deal with a client, hiring your first employee,
        or simply crafting a professional resume, we provide ready-to-use,
        lawyer-friendly templates you can trust. Our drag-and-drop editor
        empowers users to personalize every detail without needing technical or
        legal expertise.
      </p>
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Trusted By Thousands</h2>
        <p className="text-lg mb-4">Our platform is used by professionals in over 50 countries.</p>
        <div className="flex justify-center gap-6 flex-wrap mt-6">
          <div className="bg-gray-100 rounded-full px-6 py-2 text-sm">Designers</div>
          <div className="bg-gray-100 rounded-full px-6 py-2 text-sm">Consultants</div>
          <div className="bg-gray-100 rounded-full px-6 py-2 text-sm">Developers</div>
          <div className="bg-gray-100 rounded-full px-6 py-2 text-sm">Marketers</div>
          <div className="bg-gray-100 rounded-full px-6 py-2 text-sm">HR Professionals</div>
        </div>
      </section>
   
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2">Lawyer-Reviewed</h3>
            <p>Every template is crafted and reviewed by legal professionals to ensure compliance and peace of mind.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2">100% Customizable</h3>
            <p>Use our intuitive editor to tailor each document to your needs—no tech skills required.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2">Instant Download</h3>
            <p>Download your documents in PDF or Word format instantly after editing—no waiting, no hassle.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="font-semibold text-lg">Choose a Template</h3>
            <p>Select from a library of pre-made, professional templates.</p>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="font-semibold text-lg">Customize It</h3>
            <p>Use our editor to modify content, add logos, or change layouts.</p>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="font-semibold text-lg">Download & Use</h3>
            <p>Instantly download and put your document to work.</p>
          </div>
        </div>
      </section>
      <h2 className="text-2xl font-semibold mt-20 mb-4">What You Can Create</h2>
      <ul className="list-disc list-inside text-lg grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
        <li>Freelance Contracts</li>
        <li>Non-Disclosure Agreements (NDAs)</li>
        <li>Employment Contracts</li>
        <li>Influencer Collaboration Agreements</li>
        <li>Invoice Templates</li>
        <li>Resume Templates</li>
        <li>Quotation & Estimate Templates</li>
        <li>Business Plan Templates</li>
        <li>Expense Report Templates</li>
        <li>Lease Agreements</li>
      </ul>

      <p className="text-lg mt-6">
        Designed with flexibility and simplicity in mind, our editor adapts to
        your needs—whether you're working solo, managing a team, or running an
        agency. Your documents, your way.
      </p>

      <p className="text-lg mt-6">
        Join thousands of users who’ve made the smart switch to modern,
        easy-to-edit templates. We're here to help you work smarter—not harder.
      </p>
    </div>

  )
}
