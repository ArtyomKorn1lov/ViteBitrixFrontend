import axios from 'axios';
import Translations from '@/translations';
import { SimpleObject } from '@/core/types';
import { BodyTypes, RequestTypes } from '@/core/enums';
import { ResponseException } from '@/core/exceptions';
import { RequestConfig, RequestResponse } from '@/core/models';
import { ObjectHelper } from '@/core/utils';

const t = Translations.global.t;

/**
 * @description абстрактный класс REST API-клиента, доступные типы запросов: GET, PUT, POST, DELETE
 */
export default abstract class BaseApiClient {
  protected apiUrl: string;

  protected constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  protected prepareUrl(url: string, params: SimpleObject | null = null): string {
    let queryString: string = '';
    if (!!params && !ObjectHelper.isEmpty(params)) {
      queryString = '?' + new URLSearchParams(ObjectHelper.removeEmptyProperties(params));
    }
    return `${this.apiUrl}${url}${queryString}`;
  }

  protected buildFormData<T>(formData: FormData, data: T, parentKey = ''): void {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value: any = data === null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  protected jsonToFormData<T>(data: T): FormData {
    const formData = new FormData();
    this.buildFormData(formData, data);
    return formData;
  }

  protected setPayload<T>(data: T | FormData, dataType: BodyTypes | null = BodyTypes.json) {
    switch (dataType) {
      case BodyTypes.formData:
        // @ts-ignore
        data = this.jsonToFormData<T>(data);
        break;
      default:
        break;
    }
    return data;
  }

  protected async buildRequest<T, K>(
    url: string,
    { data, dataType = BodyTypes.json, params = null, headers = {}, requestType = RequestTypes.post }: RequestConfig<T>,
  ): Promise<RequestResponse<K>> {
    const requestUrl: string = this.prepareUrl(url, params);

    const payload = data ? this.setPayload(data, dataType) : {};
    const config: SimpleObject = {};
    if (headers) {
      config['headers'] = { ...headers };
    }

    switch (requestType) {
      case RequestTypes.get:
        return await axios.get(requestUrl, config);
      case RequestTypes.put:
        return await axios.put(requestUrl, payload, config);
      case RequestTypes.delete:
        return await axios.delete(requestUrl, config);
      default:
        return await axios.post(requestUrl, payload, config);
    }
  }

  protected createSuccess<T>(response: RequestResponse<T>): T | null | undefined {
    if (!response) {
      throw new ResponseException({
        message: t('core.api.serverError'),
        status: 500,
      });
    }
    return response?.data;
  }

  async createError(exception: any): Promise<void> {
    throw new ResponseException({
      message: exception?.message,
      status: exception?.status,
    });
  }

  protected async executeRequest<T, K>(url: string, config: RequestConfig<T>): Promise<K | null | undefined> {
    try {
      return this.createSuccess(await this.buildRequest<T, K>(url, config));
    } catch (exception) {
      await this.createError(exception);
    }
  }
}
