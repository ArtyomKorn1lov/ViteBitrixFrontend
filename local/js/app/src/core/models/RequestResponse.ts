interface RequestResponse<T> {
  data?: T | null;
  status?: number;
}

export default RequestResponse;
