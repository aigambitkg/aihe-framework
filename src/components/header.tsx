"use client";

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md dark:bg-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            AIHE-Framework
          </Link>
        </div>
        
        {/* Desktop Navigation - Hidden by default */}
        <nav className={`absolute top-16 left-0 right-0 bg-white dark:bg-slate-800 shadow-md md:shadow-none md:static md:bg-transparent dark:md:bg-transparent transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Startseite
            </Link>
            <Link 
              href="/framework" 
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Framework
            </Link>
            <Link 
              href="/assessment" 
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              href="/documentation" 
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Dokumentation
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Über uns
            </Link>
          </div>
        </nav>
        
        {/* Menu Toggle Button */}
        <button 
          className="text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
