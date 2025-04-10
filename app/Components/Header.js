'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          <img src="/images/logo.png" alt="" className='w-[200px] h-[60px] object-cover'  />
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="md:hidden bg-white border-t p-4 space-y-4 shadow-md">
          <Link href="/about" className="block text-gray-600 hover:text-gray-900">About</Link>
          {/* <Link href="/services" className="block text-gray-600 hover:text-gray-900">Services</Link> */}
          <Link href="/contact" className="block text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
      )}
    </header>
  );
}