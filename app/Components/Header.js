'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the mobile menu

  // Close the mobile menu if clicked/touched outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listeners for both mouse click and touch
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md mb-8 w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          <img src="/images/logo.png" alt="" className='w-[200px] h-[60px] object-cover' />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-[#5d17eb] font-medium hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-[#5d17eb] font-medium hover:text-gray-900">About Us</Link>
          <Link href="/forms" className="text-[#5d17eb] font-medium hover:text-gray-900">Create New Form</Link>
          <Link href="/contact" className="text-[#5d17eb] font-medium hover:text-gray-900">Contact Us</Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>
      </div>

      {isOpen && (
        <nav ref={menuRef} className="fixed top-[90px] left-0 right-0 bottom-0 h-fit bg-[#5d17eb] py-6 space-y-5 shadow-md z-50">
          <div className="flex justify-end">
            {/* You can add a close button here if you'd like */}
          </div>
          <Link href="/" className="block text-white text-center">Home</Link>
          <Link href="/about" className="block text-white text-center">About Us</Link>
          <Link href="/forms" className="block text-white text-center">Create New Form</Link>
          <Link href="/contact" className="block text-white text-center">Contact Us</Link>
        </nav>
      )}
    </header>
  );
}
  