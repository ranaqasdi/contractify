import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function page(props) {
  return (
    <>
    <section className='flex justify-center pt-36 pb-16 bg-[url(/images/4.png)] bg-cover bg-no-repeat bg-center'>
        <div className='flex w-[70%] justify-center items-center flex-col gap-y-4'>
            <h2 className="text-blue-950 font-semibold text-6xl">1,800+ Jotform PDF Templates</h2>
            <h2 className="text-blue-950 font-medium text-xl">With hundreds of templates for just as many industries, Jotform has the tools to meet your unique business needs.</h2>

        </div>
    </section>

    <section className='flex items-center flex-col py-20'>
    <h2 className="text-blue-950 mb-12 font-bold text-3xl" >Which Template Of Document You Like The Most?</h2>
        <div className='flex lg:w-[70%] w-[90%] lg:flex-row flex-col gap-y-10 justify-between gap-x-14'>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
                <Link href={"/forms/influencer-contract/1"}>
                <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/influencer-contract01.png" alt="" />
                <div className=' py-5 px-6 '>

                <h2 className='text-blue-950 font-semibold text-xl'>Influencer Contract Template</h2>
                <p className='mt-1'>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
            <Link href={"/"}>
                <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/5.png" alt="" />
                <div className=' py-5 px-6 '>

                <h2 className='text-blue-950 font-semibold text-xl'>Template 2</h2>
                <p className='mt-1'>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
            <Link href={"/"}>
                <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/5.png" alt="" />
                <div className=' py-5 px-6 '>

                <h2 className='text-blue-950 font-semibold text-xl'>Template 3</h2>
                <p className='mt-1'>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
           

        </div>
    </section>
    <div className='flex justify-center items-center h-screen'>
        <button className='bg-green-500 py-5 px-12 '>
            <Link href="/forms/nda-forms" >New NDA Form</Link>

        </button>
    </div>
</>
  )
}

page.propTypes = {

}

export default page

