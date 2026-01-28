'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
          Hùng Nguyễn <span className="text-secondary"> V I N F A S T</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/dang-ky-lai-thu" className="hover:text-secondary transition-colors">
              Đăng ký lái thử
            </Link>
            <Link href="/gallery" className="hover:text-secondary transition-colors">
              Khách hàng
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/dang-ky-lai-thu"
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng ký lái thử
            </Link>
            <Link
              href="/gallery"
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Khách hàng
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
