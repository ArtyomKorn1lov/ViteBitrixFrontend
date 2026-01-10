import { RequestConfig } from '@/core/models';
import { RequestTypes } from '@/core/enums';
import BaseApiClient from '@/core/api-client/BaseApiClient';

/**
 * @description реализация API-клиента для данной программной системы
 */
export default class ApiClient extends BaseApiClient {
  public async post<T, K>(url: string, config: RequestConfig<T> = {}): Promise<K | null | undefined> {
    return await this.executeRequest<T, K>(url, {
      ...config,
      requestType: RequestTypes.post,
    });
  }

  public async put<T, K>(url: string, config: RequestConfig<T> = {}): Promise<K | null | undefined> {
    return await this.executeRequest<T, K>(url, {
      ...config,
      requestType: RequestTypes.put,
    });
  }

  public async delete<T, K>(url: string, config: RequestConfig<T> = {}): Promise<K | null | undefined> {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.delete,
    });
  }

  public async get<T, K>(url: string, config: RequestConfig<T> = {}): Promise<K | null | undefined> {
    return await this.executeRequest(url, {
      ...config,
      requestType: RequestTypes.get,
    });
  }
}
