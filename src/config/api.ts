// config/api.ts
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

export interface ApiEndpoints {
  getAllProducts: string;
  getRandomProduct: string;
  createProduct: string;
  deleteProduct: (id: string) => string;
  updateProduct: (id: string) => string;
}

export const apiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  timeout: 10000, 
  retries: 3
};

export const apiEndpoints: ApiEndpoints = {
  getAllProducts: '/',
  getRandomProduct: '/random',
  createProduct: '/',
  deleteProduct: (id: string) => `/delete/${id}`,
  updateProduct: (id: string) => `/update/${id}`
};

export const defaultHeaders = {
  'accept': 'application/json',
  'Content-Type': 'application/json'
};