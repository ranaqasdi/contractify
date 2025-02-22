import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex justify-center py-20 ">
        <div className="flex flex-col items-center w-[70%] gap-y-4">
          <h2 className="text-orange-500 font-semibold text-xl">EASIEST ONLINE FORM BUILDER</h2>
          <h2 className="text-blue-950 font-semibold text-6xl">Powerful forms get it done.</h2>
          <p className="text-3xl font-medium text-center">We believe the right form makes all the difference. Go from busywork to less work with powerful forms that use conditional logic, accept payments, generate reports, and automate workflows.</p>
          <Link href={"/forms"}>
            <button className='bg-orange-500 text-white font-bold py-5 px-12 mt-10 hover:bg-blue-950 transition-colors duration-500'>
              Create New Form
            </button>
          </Link>
        </div>
      </section>
      <div className=''>
        <div className="bg-orange-50 flex justify-center py-20">
          <div className="flex w-[70%] gap-x-32">
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full" src="/images/1.svg" alt="" />
              <h2 className="font-bold text-2xl">Build the form you need in minutes</h2>
              <p>Create professional-looking forms with no coding using Jotform’s online Form Builder. Then style your forms with your own logo, fonts, and colors.</p>
            </div>
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full" src="/images/2.svg" alt="" />
              <h2 className="font-bold text-2xl">Integrate your form with business apps</h2>
              <p>Automatically send form submissions to email marketing services, project management boards, CRMs, cloud storage apps, and more with Jotform’s 150+ integrations.</p>
            </div>
            <div className="w-1/3 flex flex-col gap-y-4">
              <img className="w-full" src="/images/3.svg" alt="" />
              <h2 className="font-bold text-2xl">Collect online payments seamlessly</h2>
              <p>Whether you’re selling a product, accepting a fee, or collecting a donation, Jotform allows you to get paid directly through your form.</p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
