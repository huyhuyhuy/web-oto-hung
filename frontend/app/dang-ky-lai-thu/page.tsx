import PriceQuoteForm from '@/components/PriceQuoteForm';

export const metadata = {
  title: 'Nhận Báo Giá Xe - Hùng Nguyễn - V I N F A S T',
  description: 'Nhận báo giá xe VinFast miễn phí. Ưu đãi tốt nhất, tư vấn nhiệt tình.',
};

export default function PriceQuotePage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            {/* <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Nhận Báo Giá Xe VinFast
            </h1> */}
            <p className="text-xl text-gray-600">
              Nhận báo giá chi tiết và ưu đãi tốt nhất. <br /> Chúng tôi sẽ liên hệ trong vòng 24h.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <PriceQuoteForm />
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Tại sao nên mua xe tại Hùng?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Báo giá minh bạch</h4>
                  <p className="text-gray-600 text-sm">
                    Cam kết giá tốt nhất, không phát sinh chi phí ẩn
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Tư vấn chuyên nghiệp</h4>
                  <p className="text-gray-600 text-sm">
                    Đội ngũ tư vấn nhiệt tình, am hiểu sản phẩm
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Hỗ trợ trả góp</h4>
                  <p className="text-gray-600 text-sm">
                    Lãi suất ưu đãi, hồ sơ đơn giản, duyệt nhanh
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Ưu đãi hấp dẫn</h4>
                  <p className="text-gray-600 text-sm">
                    Nhiều chương trình khuyến mãi đặc biệt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
