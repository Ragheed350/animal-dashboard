import { AxiosRequestConfig } from 'axios';

import { ApiProvider } from './api-provider';
import { HttpMethod } from './enums';
import { ApiResult } from './models';

export class ApiService {
  private provider: ApiProvider;

  constructor(config: AxiosRequestConfig) {
    this.provider = new ApiProvider(config);
  }

  protected get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const method = HttpMethod.GET;
    return this.provider.request({ method, url, ...config });
  }

  protected delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const method = HttpMethod.DELETE;
    return this.provider.request({ method, url, ...config });
  }

  protected post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    const method = HttpMethod.POST;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  protected put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    const method = HttpMethod.PUT;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }

  protected patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    const method = HttpMethod.PATCH;
    return this.provider.request({
      method,
      url,
      data,
      ...config,
    });
  }
}
