// services/apiService.ts
import { apiConfig, apiEndpoints, defaultHeaders } from '../config/api';
import type { Product, ApiResponse, HttpMethod } from '../types/index';

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.timeout = apiConfig.timeout;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: any,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const requestHeaders = { ...defaultHeaders, ...headers };

    try {
      const config: RequestInit = {
        method,
        headers: requestHeaders,
        signal: AbortSignal.timeout(this.timeout),
      };

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        data: responseData,
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
      };
    }
  }

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>(apiEndpoints.getAllProducts);
  }

  async getRandomProduct(): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(apiEndpoints.getRandomProduct);
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(
      apiEndpoints.createProduct,
      'POST',
      product
    );
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(
      apiEndpoints.updateProduct(id),
      'PUT',
      product
    );
  }

  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>(
      apiEndpoints.deleteProduct(id),
      'DELETE'
    );
  }

  // Custom request method for the UI
  async customRequest(
    url: string,
    method: HttpMethod,
    headers?: Record<string, string>,
    body?: any
  ): Promise<ApiResponse> {
    // Extract endpoint from full URL
    const endpoint = url.replace(this.baseUrl, '');
    return this.makeRequest(endpoint, method, body, headers);
  }
}

export const apiService = new ApiService();