import { injectable } from 'inversify';
import Localisation from '@/core/translations/Localisation';
import { SuccessStatusCode } from '@/core/constants';
import { RequestResponse, BxRequestResponse } from '@/core/models';
import ApiClient from '@/core/api-client/ApiClient';
import { ApiClientInterface } from '@/core/interfaces';
import { ResponseException } from '@/core/exceptions';
import { SimpleObject } from '@/core';

const t = Localisation.global.t;

@injectable()
export default class BxApiClient extends ApiClient implements ApiClientInterface {
  public constructor(apiUrl: string) {
    super(apiUrl);
  }

  protected override prepareHeaders(additionHeaders: SimpleObject = {}): SimpleObject {
    const headers: SimpleObject = super.prepareHeaders(additionHeaders);
    const bitrixSessId = BX.message('bitrix_sessid');
    const language = BX.languageId;
    return {
      ...(bitrixSessId && { 'x-bitrix-csrf-token': bitrixSessId }),
      ...(language && { 'Accept-Language': language }),
      ...headers,
    };
  }

  protected override createSuccess<T>(response: RequestResponse<T>): T | null | undefined {
    const result: BxRequestResponse<T> = super.createSuccess<BxRequestResponse<T> | T>(response) as BxRequestResponse<T>;
    if (result && typeof result === 'object' && 'data' in result) {
      if (result.status === SuccessStatusCode) {
        return result.data;
      }
      const errorMessage: string = result.errors?.[0]?.message ?? t('core.api.serverError');
      throw new ResponseException({
        message: errorMessage,
        status: response.status,
      });
    }
    return result as T | null | undefined;
  }
}
