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
      <div className="card group cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={car.attributes.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {car.attributes.featured && (
            <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
              Nổi bật
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-2">
            {car.attributes.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {car.attributes.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-secondary">
              {formatPrice(car.attributes.price)}
            </span>
            <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
              Chi tiết →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
