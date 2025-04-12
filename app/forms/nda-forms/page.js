import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function page(props) {
    return (
        <>


            <section className='flex justify-center lg:pt-36 pt-16 pb-16 bg-[url(/images/4.png)] bg-cover bg-no-repeat bg-center'>
                <div className='flex lg:w-[70%] w-[90%] justify-center items-center flex-col gap-y-4'>
                    <h2 className="text-[#5d17eb] font-semibold lg:text-6xl text-4xl text-center" >NDA FORM Templates</h2>
                    <h2 className="text-[#5d17eb] font-medium text-xl text-center">Easily create custom Non-Disclosure Agreements with our live PDF editor. Secure your ideas and share confidently—no legal hassle.</h2>

                </div>
            </section>

            <section className='flex items-center flex-col py-20'>
                <h2 className="text-[#5d17eb] mb-12 font-bold text-3xl text-center px-4" >Which Template Of Document You Like The Most?</h2>
                <div className='flex lg:w-[70%] w-[90%] lg:flex-row flex-col gap-y-10 justify-between gap-x-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
                        <Link href={"/forms/nda-forms/1"}>
                            <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/nda-form01.png" alt="" />
                            <div className=' py-5 px-6 '>

                                <h2 className='text-blue-950 font-semibold text-xl  mb-2'>Template #1</h2>
                                <p className='mt-1'>Easily create one-way NDAs to protect your confidential information when sharing ideas with others.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
                        <Link href={"/forms/nda-forms/2"}>
                            <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/nda02.png" alt="" />
                            <div className=' py-5 px-6 '>

                                <h2 className='text-blue-950 font-semibold text-xl mb-2'>Template #2</h2>
                                <p className='mt-1'>Build mutual NDAs for secure collaboration between two parties—simple, clear, and legally sound.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300 bg-[#5d17eb15] '>
                        <Link href={"/forms/nda-forms/3"}>
                            <img className='w-full h-[250px] object-contain object-top bg-white' src="/images/nda03.png" alt="" />
                            <div className=' py-5 px-6 '>

                                <h2 className='text-blue-950 font-semibold text-xl mb-2'>Template #3</h2>
                                <p className='mt-1'>Customize employee NDAs to protect sensitive company data during and after employment.</p>
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

