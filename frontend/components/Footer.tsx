import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hùng Nguyễn - V I N F A S T</h3>
            <p className="text-gray-400">
              Showroom VinFast uy tín, chuyên bán xe điện VinFast chính hãng.
              Tư vấn nhiệt tình, giá tốt nhất.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📞 Hotline: 0123 456 789</li>
              <li>📧 Email: hung@vinfast.vn</li>
              <li>📍 Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hùng Nguyễn - V I N F A S T. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
