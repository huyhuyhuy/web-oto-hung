import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getCarBySlug, getImageUrl } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import PriceQuoteForm from '@/components/PriceQuoteForm';
import CommentSection from '@/components/CommentSection';
import CarGallery from '@/components/CarGallery';
import { BlocksRenderer } from '@/lib/blocks-renderer';
import type { Metadata } from 'next';

// Function to convert YouTube links to embedded iframes
function processYouTubeLinks(content: string): string {
  // Pattern: [text](youtube-url)
  const youtubeMarkdownPattern = /\[([^\]]+)\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})[^\)]*)\)/g;
  
  return content.replace(youtubeMarkdownPattern, (match, text, url, videoId) => {
    return `
<div style="margin: 2rem 0;">
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);"
      src="https://www.youtube.com/embed/${videoId}" 
      title="${text}" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
  <p style="text-align: center; margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280; font-style: italic;">${text}</p>
</div>`;
  });
}

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);
  
  if (!car) {
    return {
      title: 'Không tìm thấy xe - Hùng Nguyễn - V I N F A S T',
      description: 'Xe không tồn tại hoặc đã bị xóa',
    };
  }

  const imageUrl = car.attributes.images?.data?.[0]?.attributes?.url 
    ? getImageUrl(car.attributes.images.data[0].attributes.url)
    : null;

  return {
    title: `${car.attributes.name} - Giá ${formatPrice(car.attributes.price)} | Hùng Nguyễn - V I N F A S T`,
    description: car.attributes.description || `Xe điện ${car.attributes.name} chính hãng VinFast. Giá tốt nhất thị trường. Đăng ký lái thử miễn phí.`,
    keywords: `${car.attributes.name}, VinFast, xe điện, giá xe ${car.attributes.name}, mua xe VinFast, đăng ký lái thử`,
    openGraph: {
      title: `${car.attributes.name} - ${formatPrice(car.attributes.price)}`,
      description: car.attributes.description,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.attributes.name} - ${formatPrice(car.attributes.price)}`,
      description: car.attributes.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const car = await getCarBySlug(params.slug);

  if (!car) {
    notFound();
  }

  const images = car.attributes.images?.data || [];
  const hasDetailedContent = car.attributes.detailedContent && 
    (Array.isArray(car.attributes.detailedContent) || typeof car.attributes.detailedContent === 'string');
  const hasDetailedPromo = car.attributes.detailedPromo && typeof car.attributes.detailedPromo === 'string';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header với tên xe */}
      <section className="bg-white py-4 border-b-2 border-gray-200">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {car.attributes.name} 2026
          </h1>
        </div>
      </section>

      {/* Hàng 2: Khung 1 (Gallery + Giá) + Khung 2 (Form) */}
      <section className="py-6 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* KHUNG 1 (Trái - 2 cột): Gallery + Giá */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Gallery ảnh */}
              <div className="mb-6">
                <CarGallery 
                  imageUrls={images.map(img => getImageUrl(img.attributes.url))}
                  carName={car.attributes.name}
                />
              </div>

              {/* Giá bán, Giá gốc, Khuyến mãi */}
              <div className="flex-1 flex flex-col justify-center bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                {/* Giá bán */}
                <div className="mb-4">
                  <span className="text-base text-gray-600 uppercase font-semibold">GIÁ BÁN: </span>
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(car.attributes.price)}
                  </span>
                </div>
                
                {/* Giá gốc */}
                {car.attributes.originalPrice && (
                  <div className="mb-4">
                    <span className="text-base text-gray-600 uppercase font-semibold">GIÁ GỐC: </span>
                    <span className="text-2xl text-gray-500 line-through">
                      {formatPrice(car.attributes.originalPrice)}
                    </span>
                  </div>
                )}
                
                {/* Khuyến mãi */}
                {car.attributes.discount && (
                  <div className="mb-4 last:mb-0">
                    <span className="text-base text-gray-600 uppercase font-semibold">KHUYẾN MÃI: </span>
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(car.attributes.discount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* KHUNG 2 (Phải - 1 cột): Form Nhận báo giá */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md h-full flex flex-col p-6 md:p-8">
                <PriceQuoteForm carId={car.id} carName={car.attributes.name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hàng 3 (KHUNG 3): Ưu đãi chi tiết */}
      {hasDetailedPromo && (
        <section className="py-6 bg-gray-50">
          <div className="container-custom">
            <div className="prose prose-base max-w-none
              prose-p:text-base prose-p:mb-3 prose-p:leading-relaxed
              prose-strong:text-red-600 prose-strong:font-bold
              prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2
              prose-li:flex prose-li:items-start prose-li:gap-2 prose-li:text-base
              prose-li:before:content-['👉'] prose-li:before:flex-shrink-0"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {car.attributes.detailedPromo}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Hàng 4: CHI TIẾT xe */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="bg-primary text-white text-center py-4">
            <h2 className="text-2xl md:text-3xl font-bold">CHI TIẾT XE</h2>
          </div>
          <div className="bg-white p-8">
          {hasDetailedContent ? (
            // Render content (Blocks hoặc Markdown)
            typeof car.attributes.detailedContent === 'string' ? (
              // Markdown content with YouTube auto-embed
              <div className="prose prose-lg max-w-none
                prose-headings:text-primary 
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-secondary prose-a:font-medium hover:prose-a:underline
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:list-inside
                prose-ol:my-4 prose-ol:list-decimal prose-ol:list-inside
                prose-li:text-gray-700 prose-li:my-2
                prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-table:border-collapse prose-table:w-full prose-table:my-6
                prose-th:bg-primary prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-300 prose-td:p-3
                prose-tr:even:bg-gray-50"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      <Image
                        src={props.src?.startsWith('http') ? props.src : getImageUrl(props.src || '')}
                        alt={props.alt || 'Image'}
                        width={800}
                        height={600}
                        className="rounded-lg shadow-lg my-6 w-full h-auto"
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8">
                        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
                          {props.children}
                        </table>
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-primary text-white">
                        {props.children}
                      </thead>
                    ),
                    tbody: ({ node, ...props }) => (
                      <tbody>
                        {props.children}
                      </tbody>
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                        {props.children}
                      </tr>
                    ),
                    th: ({ node, ...props }) => (
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">
                        {props.children}
                      </th>
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border border-gray-300 px-6 py-3">
                        {props.children}
                      </td>
                    ),
                    a: ({ node, ...props }) => {
                      return (
                        <a
                          href={props.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary font-medium hover:underline"
                        >
                          {props.children}
                        </a>
                      );
                    },
                  }}
                >
                  {processYouTubeLinks(car.attributes.detailedContent)}
                </ReactMarkdown>
              </div>
            ) : (
              // Blocks content (JSON)
              <BlocksRenderer content={car.attributes.detailedContent} />
            )
          ) : (
            // Fallback layout cũ (nếu chưa có detailedContent)
            <div className="space-y-8">
              {/* Mô tả */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">Giới thiệu</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {car.attributes.description}
                </p>
              </div>

              {/* Thông số kỹ thuật */}
              {car.attributes.specifications && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-4">Thông số kỹ thuật</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <pre className="text-gray-700 whitespace-pre-line font-sans text-base leading-relaxed">
                      {car.attributes.specifications}
                    </pre>
                  </div>
                </div>
              )}

              {/* Màu sắc */}
              {car.attributes.color && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-4">Màu sắc</h2>
                  <p className="text-gray-700 text-lg">{car.attributes.color}</p>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </section>

      {/* Hàng 5: Đánh giá của khách hàng */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Đánh giá của khách hàng
          </h2>
          <CommentSection carId={car.id} />
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: car.attributes.name,
            description: car.attributes.detailedPromo || `Xe điện ${car.attributes.name} với giá từ ${formatPrice(car.attributes.priceFrom)}`,
            image: images.map((img: any) => getImageUrl(img.attributes.url)),
            offers: {
              '@type': 'Offer',
              price: car.attributes.price,
              priceCurrency: 'VND',
              availability: 'https://schema.org/InStock',
              priceValidUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '9858',
            },
            brand: {
              '@type': 'Brand',
              name: 'VinFast',
            },
          }),
        }}
      />
    </div>
  );
}
