import Image from 'next/image';
import { getGallery, getImageUrl } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Gallery - Khoảnh Khắc Bàn Giao Xe',
  description: 'Hình ảnh khách hàng nhận xe tại VinFast Hùng. Niềm vui và sự hài lòng của khách hàng là niềm tự hào của chúng tôi.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const response = await getGallery();
  const galleryItems = response.data || [];

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Khoảnh Khắc Bàn Giao Xe
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Niềm vui của khách hàng khi nhận xe chính là động lực lớn nhất của chúng tôi.
            Cảm ơn quý khách đã tin tưởng VinFast Hùng!
          </p>
        </div>

        {galleryItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              Đang cập nhật hình ảnh. Vui lòng quay lại sau!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item: any) => (
              <div key={item.id} className="card group">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={getImageUrl(item.attributes.image?.data?.attributes?.url)}
                    alt={item.attributes.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.attributes.title}
                  </h3>
                  {item.attributes.description && (
                    <p className="text-gray-600 mb-3">
                      {item.attributes.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {formatDate(item.attributes.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-primary text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bạn cũng muốn có khoảnh khắc như thế này?
          </h2>
          <p className="text-xl mb-6">
            Hãy để chúng tôi giúp bạn sở hữu chiếc xe VinFast mơ ước!
          </p>
          <a href="/dang-ky-lai-thu" className="btn-primary inline-block">
            Đăng ký lái thử ngay
          </a>
        </div>
      </div>
    </div>
  );
}
