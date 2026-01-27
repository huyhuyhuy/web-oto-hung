'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryItem {
  id: number;
  attributes: {
    title: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface GalleryCarouselProps {
  items: GalleryItem[];
}

export default function GalleryCarousel({ items }: GalleryCarouselProps) {
  if (items.length === 0) {
    return <p className="text-center text-gray-500">Đang cập nhật hình ảnh...</p>;
  }

  return (
    <div className="gallery-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="pb-12"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group cursor-grab active:cursor-grabbing">
              <Image
                src={getImageUrl(item.attributes.image?.data?.attributes?.url)}
                alt={item.attributes.title || 'Bàn giao xe'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .gallery-carousel .swiper-button-prev,
        .gallery-carousel .swiper-button-next {
          color: #E31E24;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-carousel .swiper-button-prev:after,
        .gallery-carousel .swiper-button-next:after {
          font-size: 20px;
        }
        
        .gallery-carousel .swiper-pagination-bullet {
          background: #0A2E5C;
          opacity: 0.3;
        }
        
        .gallery-carousel .swiper-pagination-bullet-active {
          background: #E31E24;
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .gallery-carousel .swiper-button-prev,
          .gallery-carousel .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
