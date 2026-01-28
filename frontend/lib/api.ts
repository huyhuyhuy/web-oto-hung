import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Car {
  id: number;
  attributes: {
    name: string;
    slug: string;
    price: number;
    description: string;
    specifications: string;
    color: string;
    featured: boolean;
    detailedContent?: any; // Strapi Blocks JSON
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface TestDrive {
  name: string;
  phone: string;
  address: string;
  carId?: number;
  notes?: string;
}

export interface Comment {
  name: string;
  content: string;
  carId?: number;
}

export interface Gallery {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    createdAt: string;
  };
}

// API Functions
export const getCars = async () => {
  const response = await api.get('/cars?populate=*');
  return response.data;
};

export const getCarBySlug = async (slug: string) => {
  const response = await api.get(`/cars?filters[slug][$eq]=${slug}&populate=*`);
  return response.data.data[0];
};

export const getFeaturedCars = async () => {
  const response = await api.get('/cars?filters[featured][$eq]=true&populate=*');
  return response.data;
};

export const createTestDrive = async (data: TestDrive) => {
  const response = await api.post('/test-drives', { data });
  return response.data;
};

export const getComments = async (carId?: number) => {
  let url = '/comments?populate=*&sort=createdAt:desc';
  if (carId) {
    url = `/comments?filters[car][id][$eq]=${carId}&populate=*&sort=createdAt:desc`;
  }
  const response = await api.get(url);
  return response.data;
};

export const createComment = async (data: Comment) => {
  const response = await api.post('/comments', { data });
  return response.data;
};

export const getGallery = async () => {
  const response = await api.get('/galleries?populate=*&sort=createdAt:desc');
  return response.data;
};

export const getImageUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};
