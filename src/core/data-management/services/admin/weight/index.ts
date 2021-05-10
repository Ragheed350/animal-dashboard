import { Weight, Weight_D_Req, Weight_I_Req, Weight_S_Req, Weight_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class WeightService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Weight[]>> => this.get<Weight[]>(`weights`);

  public Insert = async ({ weight }: Weight_I_Req): Promise<ApiResult<Weight>> => this.post<Weight>(`weights`, weight);

  public Update = async ({ weight, id }: Weight_U_Req): Promise<ApiResult<Weight>> => this.put<Weight>(`weights/${id}`, weight);

  public Delete = async ({ id }: Weight_D_Req): Promise<ApiResult<Weight>> => this.delete<Weight>(`weight/destroy/${id}`);

  public Show = async ({ id }: Weight_S_Req): Promise<ApiResult<Weight>> => this.get<Weight>(`weight/show/${id}`);
}

export const weightService = new WeightService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
