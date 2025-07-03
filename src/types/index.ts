// types/index.ts
export interface Sugar {
  added: number;
  natural: number;
}

export interface Macros {
  fat: number;
  protein: number;
  carbs: number;
}

export type ProductCategory = 'drink' | 'food' | 'oil' | 'daily';
export type ProductType = 'sugarless';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Product {
  id?: string;
  name: string;
  sugar: Sugar;
  type: ProductType[];
  calories: number;
  category: ProductCategory;
  macros: Macros;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface RequestState {
  url: string;
  method: HttpMethod;
  headers: string;
  body: string;
}

export interface ResponseState {
  data: string;
  isLoading: boolean;
  error: string | null;
}

export type TabType = 'home' | 'docs';