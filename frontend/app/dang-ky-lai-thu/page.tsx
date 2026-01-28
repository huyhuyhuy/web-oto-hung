import TestDriveForm from '@/components/TestDriveForm';

export const metadata = {
  title: 'Đăng Ký Lái Thử - Hùng Nguyễn - V I N F A S T',
  description: 'Đăng ký lái thử xe VinFast miễn phí. Trải nghiệm xe điện thông minh ngay hôm nay.',
};

export default function TestDrivePage() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Đăng Ký Lái Thử Miễn Phí
            </h1>
            <p className="text-xl text-gray-600">
              Trải nghiệm xe điện VinFast ngay hôm nay. Chúng tôi sẽ liên hệ trong vòng 24h.
            </p>
          </div>

          <TestDriveForm />

          <div className="mt-12 bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Tại sao nên lái thử VinFast?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Hoàn toàn miễn phí</h4>
                  <p className="text-gray-600 text-sm">
                    Không mất bất kỳ chi phí nào khi lái thử
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
                  <h4 className="font-bold mb-1">Trải nghiệm thực tế</h4>
                  <p className="text-gray-600 text-sm">
                    Lái xe trên đường thực, cảm nhận công nghệ
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
