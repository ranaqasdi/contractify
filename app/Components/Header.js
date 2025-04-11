'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        <nav className="md:hidden bg-[#5d17eb] border-t p-4 space-y-4 shadow-md">
          <Link href="/" className="block text-white ">Home</Link>
          <Link href="/about" className="block text-white">About Us</Link>
          <Link href="/forms" className="block text-white ">Create New Form</Link>
          <Link href="/contact" className="block text-white ">Contact Us</Link>
        </nav>
      )}
    </header>
  );
}