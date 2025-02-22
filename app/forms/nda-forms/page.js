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
        <div className='flex w-[70%] justify-between gap-x-14'>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg transition duration-300'>
                <Link href={"/forms/nda-forms/one"}>
                <img src="/images/5.png" alt="" />
                <div className=' py-5 px-6'>

                <h2 className='text-blue-950 font-semibold text-xl'>Template 1</h2>
                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg transition duration-300'>
            <Link href={"/"}>
                <img src="/images/5.png" alt="" />
                <div className=' py-5 px-6'>

                <h2 className='text-blue-950 font-semibold text-xl'>Template 2</h2>
                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
            <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg transition duration-300'>
            <Link href={"/"}>
                <img src="/images/5.png" alt="" />
                <div className=' py-5 px-6'>

                <h2 className='text-blue-950 font-semibold text-xl'>Template 3</h2>
                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                </div>
                </Link>
            </div>
           

        </div>
    </section>
    {/* <div className='flex justify-center items-center h-screen'>
        <button className='bg-green-500 py-5 px-12 '>
            <Link href="/forms/nda-forms" >New NDA Form</Link>

        </button>
    </div> */}
</>
  )
}

page.propTypes = {

}

export default page

