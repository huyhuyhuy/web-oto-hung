import Link from 'next/link';
import { getCars, getGallery } from '@/lib/api';
import CarCarousel from '@/components/CarCarousel';
import GalleryCarousel from '@/components/GalleryCarousel';
import CommentSection from '@/components/CommentSection';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [carsResponse, galleryResponse] = await Promise.all([
    getCars(),
    getGallery(),
  ]);

  const allCars = carsResponse.data || [];
  const galleryItems = galleryResponse.data || [];

  // Group xe theo category
  const carsByCategory: { [key: string]: typeof allCars } = {};
  allCars.forEach((car) => {
    const category = car.attributes.category || 'Khác';
    if (!carsByCategory[category]) {
      carsByCategory[category] = [];
    }
    carsByCategory[category].push(car);
  });

  // Sắp xếp category (ưu tiên "Xe gia đình" trước)
  const categories = Object.keys(carsByCategory).sort((a, b) => {
    const order = ['Xe gia đình', 'Xe cao cấp', 'Xe dịch vụ'];
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

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


      {/* Cars by Category */}
      <section id="cars-section" className="py-16 bg-white">
        <div className="container-custom">
          {/* Hiển thị từng nhóm xe */}
          {categories.map((category) => (
            <div key={category} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {category}
                </h3>
                <div className="h-1 w-20 bg-secondary rounded"></div>
              </div>
              
              <CarCarousel cars={carsByCategory[category]} />
            </div>
          ))}
          
          {allCars.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">Chưa có xe nào. Vui lòng thêm xe trong Admin Panel.</p>
            </div>
          )}
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
