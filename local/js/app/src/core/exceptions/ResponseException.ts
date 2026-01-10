interface ResponseExceptionInterface {
  message?: string;
  status?: number;
}

export default class ResponseException extends Error implements ResponseExceptionInterface {
  public status?: number;

  public constructor(data: ResponseExceptionInterface | null = null) {
    super(data?.message);
    this.status = data?.status;
  }
}
