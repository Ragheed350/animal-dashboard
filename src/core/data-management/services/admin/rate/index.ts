import { Rate, Rate_D_Req, Rate_I_Req, Rate_S_Req, Rate_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class RateService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Rate[]>> => this.get<Rate[]>(`rates`);

  public Insert = async ({ rate }: Rate_I_Req): Promise<ApiResult<Rate>> => this.post<Rate>(`rates`, rate);

  public Update = async ({ rate, id }: Rate_U_Req): Promise<ApiResult<Rate>> => this.put<Rate>(`rates/${id}`, rate);

  public Delete = async ({ id }: Rate_D_Req): Promise<ApiResult<Rate>> => this.delete<Rate>(`rate/destroy/${id}`);

  public Show = async ({ id }: Rate_S_Req): Promise<ApiResult<Rate>> => this.get<Rate>(`rate/show/${id}`);
}

export const rateService = new RateService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
