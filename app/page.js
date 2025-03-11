import Image from "next/image";
import Link from "next/link";
import Testimonials from "./Components/Testimonials";
import StatsSection from "./Components/Stats";

export default function Home() {
  return (
    <>
      <section className="flex justify-center py-20 ">
        <div className="flex flex-col items-center w-[70%] gap-y-4">
          <h2 className="text-purple-500 font-semibold text-xl">TEMPLIK THE EASIEST ONLINE FORM BUILDER</h2>
          <h2 className="text-purple-950 font-semibold text-6xl">Powerful forms get it done.</h2>
          <p className="text-3xl font-medium text-center">We believe the right form makes all the difference. Go from busywork to less work with powerful forms that use conditional logic, accept payments, generate reports, and automate workflows.</p>
          <Link href={"/forms"}>
            <button className='bg-purple-500 text-white font-bold py-5 px-12 mt-10 hover:bg-purple-950 transition-colors duration-500'>
              Create New Form
            </button>
          </Link>
        </div>
      </section>
      <div className=''>
        <div className="bg-purple-50 flex justify-center py-20">
          <div className="flex w-[70%] gap-x-32">
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/1.png" alt="" />
              <h2 className="font-bold text-2xl">Get Ready-to-Use Legal Contracts</h2>
              <p>Crafted contract templates tailored for freelancers, businesses, and professionals. Simply choose a contract, customize it, and download your legally usable PDF instantly.</p>
            </div>
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/2.png" alt="" />
              <h2 className="font-bold text-2xl">Customize & Personalize with Ease</h2>
              <p>Modify contract details to fit your specific needs using our built-in editor. Add names, terms, and clauses effortlessly—no legal expertise required.</p>
            </div>
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full rounded-2xl" src="/images/3.png" alt="" />
              <h2 className="font-bold text-2xl">Secure & Instant Downloads</h2>
              <p>Purchase contracts with confidence and receive your high-quality, ready-to-use PDF immediately. All documents are securely stored and accessible anytime.</p>
            </div>

          </div>
        </div>

        <Testimonials/>
        <StatsSection/>

      </div>
    </>
  );
}
