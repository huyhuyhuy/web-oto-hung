'use client';

import { useState, FormEvent } from 'react';
import { createPriceQuote } from '@/lib/api';
import toast from 'react-hot-toast';

interface PriceQuoteFormProps {
  carId?: number;
  carName?: string;
}

export default function PriceQuoteForm({ carId, carName }: PriceQuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPriceQuote({
        ...formData,
        carId,
      });
      
      toast.success('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ báo giá sớm nhất.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
        Nhận báo giá xe <br />
        {carName && <span className="text-secondary">{carName}</span>}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nguyễn Văn A"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0123456789"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Hà Nội"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Ghi chú (tùy chọn)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Xe mong muốn, thời gian nhận xe..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang gửi...' : 'Nhận báo giá ngay'}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Hoặc liên hệ trực tiếp qua:{' '}
        <a href="tel:0123456789" className="text-secondary font-semibold">
          0123 456 789
        </a>
      </p>
    </>
  );
}
