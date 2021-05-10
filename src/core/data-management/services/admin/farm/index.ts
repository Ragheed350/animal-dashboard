import { Farm, Farm_D_Req, Farm_I_Req, Farm_S_Req, Farm_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class FarmService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Farm[]>> => this.get<Farm[]>(`farms`);

  public Insert = async ({ farm }: Farm_I_Req): Promise<ApiResult<Farm>> => this.post<Farm>(`farms`, farm);

  public Update = async ({ farm, id }: Farm_U_Req): Promise<ApiResult<Farm>> => this.post<Farm>(`farms/${id}`, farm);

  public Delete = async ({ id }: Farm_D_Req): Promise<ApiResult<Farm>> => this.delete<Farm>(`farm/destroy/${id}`);

  public Show = async ({ id }: Farm_S_Req): Promise<ApiResult<Farm>> => this.get<Farm>(`farm/show/${id}`);
}

export const farmService = new FarmService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
