'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getComments, createComment } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  carId?: number;
}

interface Comment {
  id: number;
  attributes: {
    name: string;
    content: string;
    createdAt: string;
  };
}

export default function CommentSection({ carId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
  });

  useEffect(() => {
    loadComments();
  }, [carId]);

  const loadComments = async () => {
    try {
      const response = await getComments(carId);
      setComments(response.data);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createComment({
        ...formData,
        carId,
      });

      toast.success('Cảm ơn bạn đã bình luận!');
      
      // Reset form
      setFormData({ name: '', content: '' });
      
      // Reload comments
      loadComments();
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-primary mb-6">
        Bình luận của khách hàng ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tên của bạn *"
          />
        </div>
        <div>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nhận xét của bạn về sản phẩm, dịch vụ... *"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải bình luận...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500">
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-primary pl-4 py-2">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-primary">{comment.attributes.name}</h4>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.attributes.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{comment.attributes.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
