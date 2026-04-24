import { injectable } from 'inversify';
import Localisation from '@/core/translations/Localisation';
import { SuccessStatusCode } from '@/core/constants';
import { RequestResponse, BxRequestResponse } from '@/core/models';
import ApiClient from '@/core/api-client/ApiClient';
import { ApiClientInterface } from '@/core/interfaces';
import { ResponseException } from '@/core/exceptions';

const t = Localisation.global.t;

@injectable()
export default class BxApiClient extends ApiClient implements ApiClientInterface {
  public constructor(apiUrl: string) {
    super(apiUrl);
  }

  protected override createSuccess<T>(response: RequestResponse<T>): T | null | undefined {
    const result: BxRequestResponse<T> | T | null | undefined = super.createSuccess<BxRequestResponse<T> | T>(response);
    if (result && typeof result === 'object' && 'data' in result) {
      const bxResult: BxRequestResponse<T> = result;
      if (bxResult.status === SuccessStatusCode) {
        return bxResult?.data;
      }
      const errorMessage: string = bxResult.errors?.[0]?.message ?? t('core.api.serverError');
      throw new ResponseException({
        message: errorMessage,
        status: response.status,
      });
    }
    return result as T | null | undefined;
  }
}
