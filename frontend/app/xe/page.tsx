import { getCars } from '@/lib/api';
import CarCard from '@/components/CarCard';

export const metadata = {
  title: 'Danh Sách Xe - Hùng Nguyễn - V I N F A S T',
  description: 'Xem tất cả các dòng xe VinFast có sẵn tại showroom. Giá tốt, ưu đãi hấp dẫn.',
};

export const revalidate = 60;

export default async function CarsPage() {
  const response = await getCars();
  const cars = response.data || [];

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Danh Sách Xe VinFast
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá các dòng xe điện thông minh, hiện đại và thân thiện với môi trường
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-8">
              Hiện chưa có xe nào trong danh sách. Vui lòng quay lại sau!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car: any) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
