import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Forms(props) {
    return (
        <>
            <section className='flex justify-center pt-36 pb-16 bg-[url(/images/4.png)] bg-cover bg-no-repeat bg-center'>
                <div className='flex w-[70%] justify-center items-center flex-col gap-y-4'>
                    <h2 className="text-purple-600 font-semibold text-6xl">1,800+ Templik PDF Templates</h2>
                    <h2 className="text-purple-950 font-medium text-xl">With hundreds of templates for just as many industries, Templik has the tools to meet your unique business needs.</h2>

                </div>
            </section>

            <section className='flex items-center flex-col py-20'>
                <h2 className="text-purple-800 mb-12 font-bold text-3xl" >Which Type Of Document You Want To Generate?</h2>
                <div className='flex w-[70%] justify-between gap-x-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/nda-forms"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/nda-form01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>NDA FORMS</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/employment/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/employment1.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Employment Contract Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/influencer-contract/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/influencer-contract01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Influencer Contract Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    


                </div>


                <div className='flex w-[70%] justify-between gap-x-14 mt-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/resume/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/resume01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Resume Templates</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/estimate/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/estimate01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Estimate Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/lease/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/lease01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Property Rental Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    


                </div>


                {/* <div className='flex w-[70%] justify-between gap-x-14 mt-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/lease/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/resume01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Property Lease Templates</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/estimate/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/estimate01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Estimate Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/lease/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/lease01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-purple-950 font-semibold text-xl'>Property Rental Template</h2>
                                <p>Easily customize this Boarding Pass Template for your travel agency, airline, or as a unique gift. Download or print PDF plane tickets in...</p>
                            </div>
                        </Link>
                    </div>
                    


                </div> */}
            </section>
            {/* <div className='flex justify-center items-center h-screen'>
                <button className='bg-green-500 py-5 px-12 '>
                    <Link href="/forms/nda-forms" >New NDA Form</Link>

                </button>
            </div> */}
        </>
    )
}

Forms.propTypes = {

}

export default Forms

