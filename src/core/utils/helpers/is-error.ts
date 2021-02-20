import { ApiError, ApiResult } from '../api';

export const isError = (result: ApiResult<any>): result is ApiError =>
  (result as ApiError).errorType !== undefined;
