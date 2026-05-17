import { ResponseError } from '@/core/models';

export default class ResponseException extends Error implements ResponseError {
  public status?: number;

  public constructor(data: ResponseError | null = null) {
    super(data?.message);
    this.status = data?.status;
  }
}
