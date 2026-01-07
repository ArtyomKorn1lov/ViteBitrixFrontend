import { SimpleObject } from "@/core/types";
import { RequestTypes, BodyTypes } from '@/core/enums';

export default interface RequestConfig<T> {
  dataType?: BodyTypes | null;
  requestType?: RequestTypes | null;
  data?: T | null;
  params?: SimpleObject | null;
  headers?: SimpleObject | null;
}