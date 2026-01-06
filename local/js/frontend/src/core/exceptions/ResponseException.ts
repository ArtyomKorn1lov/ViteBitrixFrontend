export default class ResponseException extends Error {
  public status?: number;

  public constructor(data: ResponseException | null = null) {
    super(data?.message);
    this.status = data?.status;
  }
}
