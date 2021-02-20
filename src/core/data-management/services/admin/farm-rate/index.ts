import {
  FarmRate,
  FarmRate_D_Req,
  FarmRate_I_Req,
  FarmRate_S_Req,
  FarmRate_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class FarmRateService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<FarmRate[]>> =>
    this.get<FarmRate[]>(`farmrates`);

  public Insert = async ({
    farmRate,
  }: FarmRate_I_Req): Promise<ApiResult<FarmRate>> =>
    this.post<FarmRate>(`farmrates`, farmRate);

  public Update = async ({
    farmRate,
    id,
  }: FarmRate_U_Req): Promise<ApiResult<FarmRate>> =>
    this.put<FarmRate>(`farmrates/${id}`, farmRate);

  public Delete = async ({
    id,
  }: FarmRate_D_Req): Promise<ApiResult<FarmRate>> =>
    this.delete<FarmRate>(`farmrate/delete/${id}`);

  public Show = async ({ id }: FarmRate_S_Req): Promise<ApiResult<FarmRate>> =>
    this.get<FarmRate>(`farmrate/show/${id}`);
}

export const farmRateService = new FarmRateService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
