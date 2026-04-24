type BxResponseError = {
  message?: string;
};

interface BxRequestResponse<T> {
  data?: T;
  errors?: BxResponseError[];
  status?: string;
}

export default BxRequestResponse;
