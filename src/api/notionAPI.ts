import { HTTP_METHOD } from '~/constants';
import { notionAPIClient } from './apiClient';

export const requestNotionAPI = {
  get: async <T>(url: string) => {
    const response = await notionAPIClient<T>(url, { method: HTTP_METHOD.GET });

    return response;
  },
  post: async <T>(url: string, options?: Partial<RequestInit>) => {
    const response = await notionAPIClient<T>(url, {
      ...options,
      method: HTTP_METHOD.POST,
    });

    return response;
  },
  delete: async <T>(url: string, options?: Partial<RequestInit>) => {
    const response = await notionAPIClient<T>(url, {
      ...options,
      method: HTTP_METHOD.DELETE,
    });

    return response;
  },
  patch: async <T>(url: string, options?: Partial<RequestInit>) => {
    const response = await notionAPIClient<T>(url, {
      ...options,
      method: HTTP_METHOD.PATCH,
    });

    return response;
  },
  put: async <T>(url: string, options?: Partial<RequestInit>) => {
    const response = await notionAPIClient<T>(url, {
      ...options,
      method: HTTP_METHOD.PUT,
    });

    return response;
  },
};
