import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Forms(props) {
    return (
        <>
            <section className='flex justify-center lg:pt-36 pt-16 pb-16 bg-[url(/images/4.png)] bg-cover bg-no-repeat bg-center'>
                <div className='flex lg:w-[70%] w-[90%] justify-center items-center flex-col gap-y-4'>
                    <h2 className="text-[#5d17eb] font-semibold lg:text-6xl text-4xl text-center" >1,800+ Templik PDF Templates</h2>
                    <h2 className="text-[#5d17eb] font-medium text-xl text-center">With hundreds of templates for just as many industries, Templik has the tools to meet your unique business needs.</h2>

                </div>
            </section>

            <section className='flex items-center flex-col py-20'>
                <h2 className="text-[#5d17eb] mb-12 font-bold text-3xl text-center px-4" >Which Type Of Document You Want To Generate?</h2>
                <div className='flex xl:w-[70%] w-[90%] lg:flex-row flex-col gap-y-10 justify-between gap-x-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/nda-forms"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/nda-form01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>NDA FORMS</h2>
                                <p>Easily create custom Non-Disclosure Agreements with our live PDF editor. Secure your ideas and share confidently—no legal hassle.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/employment/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/employment1.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Employment Contract</h2>
                                <p>Define job roles, responsibilities, and terms of employment to ensure transparency and alignment between employers and new hires.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/influencer-contract/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/influencer-contract01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Influencer Contract</h2>
                                <p>Set clear expectations between brands and influencers with tailored contracts that outline content requirements, deadlines, and compensation.</p>
                            </div>
                        </Link>
                    </div>
                    


                </div>


                <div className='flex xl:w-[70%] w-[90%] lg:flex-row flex-col gap-y-10 justify-between gap-x-14 mt-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/resume/1"}>
                            <img className='w-full h-[250px] object-cover object-left-top' src="/images/resume01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Resume Templates</h2>
                                <p>Create a professional and polished resume with our easy-to-use templates, tailored to showcase your skills and experience.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/estimate/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/estimate01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Estimate Template</h2>
                                <p>Quickly generate accurate and detailed estimates for your clients, ensuring transparency and professionalism in every project.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/lease/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/lease01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Property Rental Template</h2>
                                <p>Easily create customized property rental agreements that protect both landlords and tenants, ensuring clear terms and smooth transactions.</p>
                            </div>
                        </Link>
                    </div>
                    


                </div>


                <div className='flex lg:w-[70%] w-[90%]  lg:flex-row flex-col gap-y-10  justify-between gap-x-14 mt-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/freelance/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/freelance01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Freelance Contract</h2>
                                <p>Craft professional freelance contracts with ease, outlining clear terms and expectations to foster successful collaborations and secure payment.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/business/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/business01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Business Plan Template</h2>
                                <p>Create a comprehensive and structured business plan to outline your company's vision, goals, and strategy for success, helping you attract investors and stay on track.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/invoice/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/invoice01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Invoice Template</h2>
                                <p>Easily create professional and clear invoices for your business transactions. Customize with your branding and details for smooth payments and record-keeping.</p>
                            </div>
                        </Link>
                    </div>
                    


                </div>
                
                <div className='flex lg:w-[70%] w-[90%] lg:flex-row flex-col gap-y-10 justify-between gap-x-14 mt-14'>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/expense/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/expense01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Expense Report Template</h2>
                                <p>Track and organize your business expenses effortlessly with our customizable expense report template. Ensure accurate financial management and smooth reimbursement processes.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/business/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/business01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Business Plan Template</h2>
                                <p>Create a comprehensive and professional business plan with ease. Our customizable template helps you outline your goals, strategies, and financial projections to attract investors </p>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-y-3 border rounded shadow hover:shadow-lg hover:shadow-purple-100 transition duration-300'>
                        <Link href={"/forms/invoice/1"}>
                            <img className='w-full h-[250px] object-cover object-top' src="/images/invoice01.png" alt="" />
                            <div className=' py-5 px-6'>

                                <h2 className='text-[#5d17eb] font-semibold text-xl mb-2'>Invoice Template</h2>
                                <p>Generate professional invoices quickly and easily with our customizable template. Perfect for freelancers, small businesses, and contractors, ensuring clear and accurate billing for your products or services.</p>
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

Forms.propTypes = {

}

export default Forms

