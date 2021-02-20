import { ApiErrorType, ApiError, ApiResponseError } from '../api';

export const isResponseError = (result: ApiError): result is ApiResponseError =>
  (result as ApiResponseError).errorType !== ApiErrorType.UNKNOWN &&
  (result as ApiResponseError).errorType !== ApiErrorType.CONNECTION;
