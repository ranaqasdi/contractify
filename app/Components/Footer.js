"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#5d17eb] text-white pt-10">
            <div className="md:max-w-[70%]  mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Left - Company Info */}
                <div className="pr-10">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        <img src="/images/logo-dark.webp" alt="" className='w-[200px] h-[60px] object-cover' />
                    </Link>
                    <p className="text-gray-200 mt-2">
                    TEMPLIK The Easiest Online Form Builder, Powerful forms get it done.
                    </p>
                </div>

                {/* Center - Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-gray-300">Home</a></li>
                        <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
                        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Top Templates</h3>
                    <ul className="mt-2 space-y-2 text-gray-400">
                        <li><a href="/forms/influencer-contract/1" className="hover:text-gray-300">Influencer Contract</a></li>
                        <li><a href="/forms/resume/1" className="hover:text-gray-300">Resume Templates</a></li>
                        <li><a href="/forms/nda-forms" className="hover:text-gray-300">NDA FORMS</a></li>
                        <li><a href="/forms/lease/1" className="hover:text-gray-300">Property Rental Template</a></li>
                    </ul>
                </div>

                {/* Right - Social Media */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex mt-2 space-x-4">
                        <a href="https://www.facebook.com/share/18oghwwZyE/?mibextid=wwXIfr" className="text-gray-200 hover:text-white text-2xl"><FaFacebook /></a>
                        <a href="https://www.instagram.com/usetemplik" className="text-gray-200 hover:text-white text-2xl"><FaInstagram /></a>
                        <a href="#" className="text-gray-200 hover:text-white text-2xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-200 hover:text-white text-2xl"><FaLinkedin /></a>
                    </div>
                </div>

            </div>

            {/* Bottom - Copyright */}
            <div className="mt-14 text-center text-purple-300 border-t border-gray-700 py-5 ">
                <p className="leading-none">© {new Date().getFullYear()} Templik. All rights reserved | Developed By <a href="https://xtreamstudios.com/" target="_blank">Xtream Studios</a>.</p>
            </div>
        </footer>
    );
}
