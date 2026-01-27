import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCarBySlug, getImageUrl } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import TestDriveForm from '@/components/TestDriveForm';
import CommentSection from '@/components/CommentSection';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const car = await getCarBySlug(params.slug);
  
  if (!car) {
    return {
      title: 'Không tìm thấy xe',
    };
  }

  return {
    title: `${car.attributes.name} - VinFast Hùng`,
    description: car.attributes.description,
  };
}

export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = await getCarBySlug(params.slug);

  if (!car) {
    notFound();
  }

  const images = car.attributes.images?.data || [];

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Car Images & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            {images.length > 0 ? (
              <div className="space-y-4">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={getImageUrl(images[0].attributes.url)}
                    alt={car.attributes.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {images.slice(1, 4).map((img: any) => (
                      <div
                        key={img.id}
                        className="relative h-24 rounded-lg overflow-hidden shadow"
                      >
                        <Image
                          src={getImageUrl(img.attributes.url)}
                          alt={car.attributes.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chưa có hình ảnh</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {car.attributes.name}
            </h1>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">
                {formatPrice(car.attributes.price)}
              </span>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-2">Thông tin cơ bản</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Màu sắc:</span>
                  <span className="font-semibold">{car.attributes.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="font-semibold text-green-600">Còn hàng</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Mô tả</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {car.attributes.description}
              </p>
            </div>

            {car.attributes.specifications && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Thông số kỹ thuật</h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {car.attributes.specifications}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <a
                href="https://zalo.me/YOUR_ZALO_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-center"
              >
                Liên hệ Zalo
              </a>
              <a
                href="tel:0123456789"
                className="btn-secondary flex-1 text-center"
              >
                Gọi ngay
              </a>
            </div>
          </div>
        </div>

        {/* Test Drive Form */}
        <div className="mb-16">
          <TestDriveForm carId={car.id} carName={car.attributes.name} />
        </div>

        {/* Comments */}
        <div>
          <CommentSection carId={car.id} />
        </div>
      </div>
    </div>
  );
}
