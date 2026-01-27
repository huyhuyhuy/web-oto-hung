'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CarCard from './CarCard';
import { Car } from '@/lib/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarCarouselProps {
  cars: Car[];
}

export default function CarCarousel({ cars }: CarCarouselProps) {
  if (cars.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Chưa có xe nào. Vui lòng quay lại sau!
      </p>
    );
  }

  return (
    <div className="car-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
        }}
        className="pb-12"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <CarCard car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .car-carousel .swiper-button-prev,
        .car-carousel .swiper-button-next {
          color: #E31E24;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .car-carousel .swiper-button-prev:after,
        .car-carousel .swiper-button-next:after {
          font-size: 20px;
        }
        
        .car-carousel .swiper-pagination-bullet {
          background: #0A2E5C;
          opacity: 0.3;
        }
        
        .car-carousel .swiper-pagination-bullet-active {
          background: #E31E24;
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .car-carousel .swiper-button-prev,
          .car-carousel .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
