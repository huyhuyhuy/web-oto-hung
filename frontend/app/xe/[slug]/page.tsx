import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getCarBySlug, getImageUrl } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import PriceQuoteForm from '@/components/PriceQuoteForm';
import CommentSection from '@/components/CommentSection';
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
      <section className="bg-gray-900 text-white py-6">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">
            {car.attributes.name} 2026
          </h1>
        </div>
      </section>

      {/* Main Content: Ảnh + Thông tin giá */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Gallery ảnh */}
            <div className="lg:col-span-2">
              {/* Ảnh lớn */}
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl mb-4">
                {images.length > 0 ? (
                  <Image
                    src={getImageUrl(images[0].attributes.url)}
                    alt={car.attributes.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Gallery thumbnail */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img: any, idx: number) => (
                    <div key={img.id} className="relative h-24 rounded overflow-hidden shadow border-2 border-gray-300 hover:border-primary cursor-pointer transition-colors">
                      <Image
                        src={getImageUrl(img.attributes.url)}
                        alt={`${car.attributes.name} - ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 10vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Thông tin giá & Form */}
            <div className="space-y-6">
              {/* Rating & Social */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(9858 đánh giá)</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700">
                    f
                  </button>
                  <button className="w-8 h-8 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500">
                    t
                  </button>
                  <button className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-800">
                    in
                  </button>
                </div>
              </div>

              {/* Giá */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-600 uppercase font-semibold">Giá Bán</span>
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(car.attributes.price)} VNĐ
                  </span>
                </div>
                
                {car.attributes.originalPrice && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600 uppercase font-semibold">Giá Gốc</span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(car.attributes.originalPrice)} VNĐ
                    </span>
                  </div>
                )}
                
                {car.attributes.discount && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600 uppercase font-semibold">Khuyến mãi</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(car.attributes.discount)} VNĐ
                    </span>
                  </div>
                )}
              </div>

              {/* Ưu đãi chi tiết */}
              {hasDetailedPromo && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                  <div className="prose prose-sm max-w-none
                    prose-p:text-sm prose-p:mb-2 prose-p:leading-relaxed
                    prose-strong:text-red-600 prose-strong:font-bold
                    prose-ul:list-none prose-ul:pl-0
                    prose-li:flex prose-li:items-start prose-li:gap-2 prose-li:mb-2
                    prose-li:before:content-['👉'] prose-li:before:flex-shrink-0"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {car.attributes.detailedPromo}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Form Nhận báo giá */}
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">📞</span>
                    <a href="tel:0387332698" className="text-3xl font-bold text-yellow-400 hover:text-yellow-300">
                      0387.332.698
                    </a>
                  </div>
                  <p className="text-center text-sm text-gray-300">
                    Hãy liên hệ ngay để được mua xe với giá tốt nhất!
                  </p>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-center font-bold text-lg mb-4 text-yellow-400">
                    NHẬN BÁO GIÁ XE
                  </h3>
                  <PriceQuoteForm carId={car.id} carName={car.attributes.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHI TIẾT Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="bg-gray-900 text-white text-center py-4 rounded-t-lg">
            <h2 className="text-2xl md:text-3xl font-bold">CHI TIẾT</h2>
          </div>
          <div className="bg-white p-8 rounded-b-lg shadow-lg">
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

      {/* Bình Luận */}
      <section className="py-16 bg-white">
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
