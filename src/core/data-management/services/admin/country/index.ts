import {
  Country,
  Country_D_Req,
  Country_I_Req,
  Country_S_Req,
  Country_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class CountryService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Country[]>> =>
    this.get<Country[]>(`countries`);

  public Insert = async ({
    country,
  }: Country_I_Req): Promise<ApiResult<Country>> =>
    this.post<Country>(`countries`, country);

  public Update = async ({
    country,
    id,
  }: Country_U_Req): Promise<ApiResult<Country>> =>
    this.put<Country>(`countries/${id}`, country);

  public Delete = async ({ id }: Country_D_Req): Promise<ApiResult<Country>> =>
    this.delete<Country>(`country/soft_delete/${id}`);

  public Show = async ({ id }: Country_S_Req): Promise<ApiResult<Country>> =>
    this.get<Country>(`country/show//${id}`);
}

export const countryService = new CountryService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
