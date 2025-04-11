"use client"
import React from 'react'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#5d17eb]">About Us</h1>
      <div className="flex lg:flex-row flex-col gap-x-5">

        <div className=' lg:w-6/12 flex items-center'>

          <p className="text-lg mb-4 text-gray-700">
            We’re on a mission to make professional documents easy, accessible, and
            stress-free for everyone — from freelancers and startups to growing
            businesses and individuals. Our platform offers a seamless way to create,
            customize, and download essential documents, saving you time, money, and
            legal headaches.<br /><br />
            Whether you're sealing a deal with a client, hiring your first employee,
            or simply crafting a professional resume, we provide ready-to-use,
            lawyer-friendly templates you can trust. Our drag-and-drop editor
            empowers users to personalize every detail without needing technical or
            legal expertise.
          </p>
        </div>
        <div className='lg:w-6/12'>
          <img className='' src="/images/aboutus01.png" alt="" />

        </div>
      </div>

      <section className="mt-32 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-[#5d17eb]">Trusted By Thousands</h2>
        <p className="text-lg mb-4 text-gray-600">Our platform is used by professionals in over 50 countries.</p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {['Designers', 'Consultants', 'Developers', 'Marketers', 'HR Professionals', 'Product Managers', 'UX/UI Designers', 'Data Analysts', 'Project Managers', 'Business Analysts', 'Sales Professionals', 'Content Creators', 'Customer Support', 'Operations Managers', 'Software Engineers'].map((role) => (
            <div key={role} className="bg-[#f5f0ff] text-[#5d17eb] font-medium rounded-full px-6 py-2 text-sm shadow-sm">
              {role}
            </div>
          ))}
        </div>

      </section>

      <section className="mt-32">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#5d17eb]">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
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
            {
              title: "Affordable Pricing",
              desc: "Get high-quality legal documents at prices that won’t break the bank.",
            },
            {
              title: "Multiple Templates",
              desc: "We offer a wide variety of contract templates for every business need, from freelancers to large enterprises.",
            },
            {
              title: "Fast Customer Support",
              desc: "Our support team is ready to assist you with any questions or issues you may encounter.",
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

      
      <section className="mt-32 px-4">
  <h2 className="text-3xl font-bold text-center text-[#5d17eb] mb-12">
    How It Works
  </h2>

  <div className="relative max-w-5xl mx-auto">
    {/* Timeline line */}
    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#e4d9fd]"></div>

    {[
      {
        step: "1",
        title: "Choose a Template",
        desc: "Browse our library of professional, ready-to-use templates and pick one that fits your needs.",
      },
      {
        step: "2",
        title: "Customize It",
        desc: "Easily modify text, upload your logo, or rearrange layouts using our intuitive editor.",
      },
      {
        step: "3",
        title: "Download & Use",
        desc: "Export your finished document instantly and start using it right away.",
      },
      {
        step: "4",
        title: "Save Your Work",
        desc: "Store your templates for quick edits or future reuse anytime.",
      },
      {
        step: "5",
        title: "Share with Clients",
        desc: "Send or present your documents professionally to clients or team members.",
      },
    ].map(({ step, title, desc }, idx) => (
      <div
        key={step}
        className={`mb-12 flex items-start md:items-center ${
          idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Step Circle */}
        <div className="flex-shrink-0 w-12 h-12 bg-[#5d17eb] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md z-10 relative left-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          {step}
        </div>

        {/* Content Card */}
        <div
          className={`mt-4 md:mt-0 w-full md:w-1/2 ${
            idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
          } pl-6`}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#ece6ff]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>









      <h2 className="text-3xl font-bold mt-32 mb-8 text-center text-[#5d17eb]">✨ What You Can Create</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

   
    </div>
  )
}
