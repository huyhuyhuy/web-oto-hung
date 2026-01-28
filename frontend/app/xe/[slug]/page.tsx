import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getCarBySlug, getImageUrl } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import TestDriveForm from '@/components/TestDriveForm';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với ảnh lớn */}
      <section className="relative h-[400px] md:h-[500px] bg-primary">
        {images.length > 0 ? (
          <>
            <Image
              src={getImageUrl(images[0].attributes.url)}
              alt={car.attributes.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-800" />
        )}
        
        {/* Title & Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-white p-8">
          <div className="container-custom">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {car.attributes.name}
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-secondary drop-shadow-lg">
              {formatPrice(car.attributes.price)}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery ảnh nhỏ */}
      {images.length > 1 && (
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.slice(1, 5).map((img: any, idx: number) => (
                <div key={img.id} className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={getImageUrl(img.attributes.url)}
                    alt={`${car.attributes.name} - ${idx + 2}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nội dung chi tiết */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-5xl">
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
      </section>

      {/* Form Đăng Ký Lái Thử */}
      <section id="dang-ky-lai-thu" className="py-16 bg-gray-100">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
            Đăng ký lái thử {car.attributes.name}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Điền thông tin bên dưới, chúng tôi sẽ liên hệ trong vòng 24h
          </p>
          <TestDriveForm carId={car.id} carName={car.attributes.name} />
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
            description: car.attributes.description,
            image: images[0] ? getImageUrl(images[0].attributes.url) : undefined,
            offers: {
              '@type': 'Offer',
              price: car.attributes.price,
              priceCurrency: 'VND',
              availability: 'https://schema.org/InStock',
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
