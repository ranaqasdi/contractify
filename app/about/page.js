"use client"
import React from 'react'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#5d17eb]">About Us</h1>
      <p className="text-lg mb-4 text-gray-700">
        We’re on a mission to make professional documents easy, accessible, and
        stress-free for everyone — from freelancers and startups to growing
        businesses and individuals. Our platform offers a seamless way to create,
        customize, and download essential documents, saving you time, money, and
        legal headaches.
      </p>

      <p className="text-lg mb-8 text-gray-700">
        Whether you're sealing a deal with a client, hiring your first employee,
        or simply crafting a professional resume, we provide ready-to-use,
        lawyer-friendly templates you can trust. Our drag-and-drop editor
        empowers users to personalize every detail without needing technical or
        legal expertise.
      </p>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-[#5d17eb]">Trusted By Thousands</h2>
        <p className="text-lg mb-4 text-gray-600">Our platform is used by professionals in over 50 countries.</p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {['Designers', 'Consultants', 'Developers', 'Marketers', 'HR Professionals'].map((role) => (
            <div key={role} className="bg-[#f5f0ff] text-[#5d17eb] font-medium rounded-full px-6 py-2 text-sm shadow-sm">
              {role}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#5d17eb]">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Lawyer-Reviewed",
              desc: "Every template is crafted and reviewed by legal professionals to ensure compliance and peace of mind.",
            },
            {
              title: "100% Customizable",
              desc: "Use our intuitive editor to tailor each document to your needs—no tech skills required.",
            },
            {
              title: "Instant Download",
              desc: "Download your documents in PDF or Word format instantly after editing—no waiting, no hassle.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition bg-white hover:bg-[#f5f0ff]"
            >
              <h3 className="font-semibold text-xl mb-2 text-[#5d17eb]">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#5d17eb]">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { step: "1", title: "Choose a Template", desc: "Select from a library of pre-made, professional templates." },
            { step: "2", title: "Customize It", desc: "Use our editor to modify content, add logos, or change layouts." },
            { step: "3", title: "Download & Use", desc: "Instantly download and put your document to work." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="p-4 bg-[#f8f5ff] rounded-xl shadow">
              <div className="text-4xl font-bold text-[#5d17eb] mb-2">{step}</div>
              <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <h2 className="text-3xl font-bold mt-20 mb-8 text-center text-[#5d17eb]">✨ What You Can Create</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    { icon: "📝", title: "Freelance Contracts" },
    { icon: "🤐", title: "Non-Disclosure Agreements (NDAs)" },
    { icon: "📄", title: "Employment Contracts" },
    { icon: "🤝", title: "Influencer Collaboration Agreements" },
    { icon: "🧾", title: "Invoice Templates" },
    { icon: "📋", title: "Resume Templates" },
    { icon: "💼", title: "Quotation & Estimate Templates" },
    { icon: "📊", title: "Business Plan Templates" },
    { icon: "🧮", title: "Expense Report Templates" },
    { icon: "🏠", title: "Lease Agreements" },
  ].map(({ icon, title }) => (
    <div
      key={title}
      className="flex items-start gap-4 bg-[#f5f0ff] p-4 rounded-xl shadow hover:shadow-md transition"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-lg font-medium text-gray-800">{title}</span>
    </div>
  ))}
</div>

<p className="text-lg mt-10 text-gray-700 text-center">
  Whether you're sealing deals, hiring talent, or launching your next big idea, our editor is built to keep up with <span className="text-[#5d17eb] font-semibold">you</span>.
</p>

<p className="text-lg mt-4 text-gray-700 text-center">
  Join thousands of modern professionals who’ve upgraded their workflow with beautifully designed, easy-to-use, and <span className="font-semibold text-[#5d17eb]">legally sound templates</span>. Work smarter, not harder.
</p>

    </div>
  )
}
