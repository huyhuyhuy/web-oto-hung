import Link from 'next/link';
import { getCarsByCategory, getGallery } from '@/lib/api';
import CarCarousel from '@/components/CarCarousel';
import GalleryCarousel from '@/components/GalleryCarousel';
import CommentSection from '@/components/CommentSection';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [carsResponse, galleryResponse] = await Promise.all([
    getCarsByCategory('Các dòng xe VinFast'),
    getGallery(),
  ]);

  const cars = carsResponse.data || [];
  const galleryItems = galleryResponse.data || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Xe Điện VinFast
            <br />
            <span className="text-secondary">Tương Lai Xanh, Hành Trình An Toàn</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Showroom VinFast Hùng - Tư vấn nhiệt tình - Giá tốt nhất thị trường
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cars-section" className="btn-primary inline-block">
              Xem bảng giá xe
            </a>
            <a href="tel:0123456789" className="btn-secondary inline-block bg-white text-primary hover:bg-gray-100">
              📞 Liên hệ ngay: 0123 456 789
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-gray-700">Xe đã bán</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">100+</div>
              <div className="text-gray-700">Khách hài lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">5★</div>
              <div className="text-gray-700">Đánh giá</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-gray-700">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Carousel */}
      <section id="cars-section" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Các Dòng Xe VinFast
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá bảng giá và ưu đãi hấp dẫn cho các dòng xe điện VinFast. 
              Liên hệ ngay để nhận báo giá chi tiết!
            </p>
          </div>
          
          <CarCarousel cars={cars} />
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Khoảnh Khắc Bàn Giao Xe
              </h2>
              <p className="text-gray-600">
                Niềm vui của khách hàng khi nhận xe chính là động lực của chúng tôi
              </p>
            </div>
            <Link href="/gallery" className="text-secondary font-semibold hover:underline hidden md:block">
              Xem tất cả →
            </Link>
          </div>
          
          <GalleryCarousel items={galleryItems} />
          
          {/* Mobile View All Link */}
          <div className="text-center mt-8 md:hidden">
            <Link href="/gallery" className="btn-secondary inline-block">
              Xem tất cả →
            </Link>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <CommentSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cần tư vấn chi tiết về xe VinFast?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để nhận báo giá tốt nhất và tư vấn chi tiết về xe điện VinFast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0123456789" className="btn-secondary inline-block bg-white text-primary hover:bg-gray-100">
              📞 Gọi ngay: 0123 456 789
            </a>
            <a href="https://zalo.me/0123456789" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
              💬 Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
