import { RequestConfig } from '@/core/models';

interface ApiClientInterface {
  post: <T, K>(url: string, config?: RequestConfig<T>) => Promise<K | null | undefined>;
  put: <T, K>(url: string, config?: RequestConfig<T>) => Promise<K | null | undefined>;
  delete: <T, K>(url: string, config?: RequestConfig<T>) => Promise<K | null | undefined>;
  get: <T, K>(url: string, config?: RequestConfig<T>) => Promise<K | null | undefined>;
}

export default ApiClientInterface;
