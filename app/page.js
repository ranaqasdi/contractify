import Image from "next/image";
import Link from "next/link";
import Testimonials from "./Components/Testimonials";
import StatsSection from "./Components/Stats";

export default function Home() {
  return (
    <>
      <section className="flex justify-center lg:py-20 py-10 ">
        <div className="flex flex-col items-center md:w-[70%] w-[90%] lg:gap-y-8 gap-y-4">
          <h2 className="text-[#5e17ebe1] font-semibold lg:text-xl text-lg text-center ">TEMPLIK THE EASIEST ONLINE FORM BUILDER </h2>
          <h2 className="text-[#5d17eb] font-semibold lg:text-6xl text-5xl text-center my-4">Powerful forms get it done.</h2>
          <p className="lg:text-3xl text-xl font-normal text-center">We believe the right form makes all the difference. Go from busywork to less work with powerful forms that use conditional logic, accept payments, generate reports, and automate workflows.</p>
          <Link href={"/forms"}>
            <button className='bg-[#5d17eb] text-white font-bold py-5 px-12 mt-10 hover:bg-[#5d17eb] transition-colors duration-500'>
              Create New Form
            </button>
          </Link>
        </div>
      </section>
      <div className=''>
        <div className="bg-[#5d17eb15] flex justify-center py-20">
          <div className="flex w-[70%] lg:flex-row flex-col gap-x-32 gap-y-10">
            <div className="lg:w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/1.png" alt="" />
              <h2 className="font-bold text-2xl">Get Ready-to-Use Legal Contracts</h2>
              <p>Crafted contract templates tailored for freelancers, businesses, and professionals. Simply choose a contract, customize it, and download your legally usable PDF instantly.</p>
            </div>
            <div className="lg:w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/2.png" alt="" />
              <h2 className="font-bold text-2xl">Customize & Personalize with Ease</h2>
              <p>Modify contract details to fit your specific needs using our built-in editor. Add names, terms, and clauses effortlessly—no legal expertise required.</p>
            </div>
            <div className="lg:w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/3.png" alt="" />
              <h2 className="font-bold text-2xl">Secure & Instant Downloads</h2>
              <p>Purchase contracts with confidence and receive your high-quality, ready-to-use PDF immediately. All documents are securely stored and accessible anytime.</p>
            </div>

          </div>
        </div>

        <Testimonials/>
        <StatsSection/>
        <section className="mt-20 px-4">
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
    </>
  );
}
