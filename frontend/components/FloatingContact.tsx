'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
      {/* Zalo Button - Lớn nhất, nổi bật nhất */}
      <div className="relative">
        <a
          href="https://zalo.me/YOUR_ZALO_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ring-4 ring-blue-200 hover:ring-blue-300"
          onMouseEnter={() => setShowTooltip('zalo')}
          onMouseLeave={() => setShowTooltip(null)}
          aria-label="Liên hệ Zalo"
        >
          {/* Zalo Logo Official */}
          <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 48 48" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4C13.5066 4 5 12.5066 5 23C5 28.8638 7.88819 33.9744 12.3037 37.0857L11.0563 43L17.2463 40.6219C19.3544 41.4944 21.6238 42 24 42C34.4934 42 43 33.4934 43 23C43 12.5066 34.4934 4 24 4Z" fill="#0068FF"/>
            <path d="M16.5 29.5L18.5 20.5L25 27.5L28.5 16.5L31.5 29.5L26 23.5L16.5 29.5Z" fill="white"/>
          </svg>
        </a>
        {showTooltip === 'zalo' && (
          <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl animate-fade-in">
            💬 Chat Zalo ngay
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Facebook Button */}
      <div className="relative">
        <a
          href="https://facebook.com/YOUR_FB_PAGE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
          onMouseEnter={() => setShowTooltip('facebook')}
          onMouseLeave={() => setShowTooltip(null)}
          aria-label="Liên hệ Facebook"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        {showTooltip === 'facebook' && (
          <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl animate-fade-in">
            📱 Nhắn tin Facebook
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Phone Button - Có animation pulse để thu hút chú ý */}
      <div className="relative">
        <a
          href="tel:0123456789"
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 relative"
          onMouseEnter={() => setShowTooltip('phone')}
          onMouseLeave={() => setShowTooltip(null)}
          aria-label="Gọi điện"
        >
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          <svg className="w-6 h-6 md:w-7 md:h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.39z"/>
          </svg>
        </a>
        {showTooltip === 'phone' && (
          <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl animate-fade-in">
            📞 0123 456 789
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
}
