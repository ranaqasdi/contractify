'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          <img src="/images/logo.png" alt="" className='w-[200px] h-[60px] object-cover'  />
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/forms" className="text-gray-600 hover:text-gray-900">Create New Form</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="md:hidden bg-white border-t p-4 space-y-4 shadow-md">
          <Link href="/" className="block text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="block text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/forms" className="block text-gray-600 hover:text-gray-900">Create New Form</Link>
          <Link href="/contact" className="block text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
      )}
    </header>
  );
}