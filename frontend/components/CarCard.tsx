import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const imageUrl = car.attributes.images?.data?.[0]
    ? getImageUrl(car.attributes.images.data[0].attributes.url)
    : '/placeholder-car.jpg';

  return (
    <Link href={`/xe/${car.attributes.slug}`}>
      <div className="card group cursor-pointer hover:shadow-2xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={car.attributes.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
            {car.attributes.name}
          </h3>
          
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm text-gray-600">Giá từ</span>
              <span className="text-2xl font-bold text-secondary">
                {formatPrice(car.attributes.priceFrom)}
              </span>
            </div>
            
            {car.attributes.shortPromo && (
              <p className="text-sm text-red-600 font-medium line-clamp-2">
                {car.attributes.shortPromo}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
