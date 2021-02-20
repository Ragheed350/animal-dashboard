import {
  Vitamin,
  Vitamin_D_Req,
  Vitamin_I_Req,
  Vitamin_S_Req,
  Vitamin_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class VitaminService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Vitamin[]>> =>
    this.get<Vitamin[]>(`vitamins`);

  public Insert = async ({
    vitamin,
  }: Vitamin_I_Req): Promise<ApiResult<Vitamin>> =>
    this.post<Vitamin>(`vitamins`, vitamin);

  public Update = async ({
    vitamin,
    id,
  }: Vitamin_U_Req): Promise<ApiResult<Vitamin>> =>
    this.put<Vitamin>(`vitamins/${id}`, vitamin);

  public Delete = async ({ id }: Vitamin_D_Req): Promise<ApiResult<Vitamin>> =>
    this.delete<Vitamin>(`vitamin/soft_delete/${id}`);

  public Show = async ({ id }: Vitamin_S_Req): Promise<ApiResult<Vitamin>> =>
    this.get<Vitamin>(`vitamin/show/${id}`);
}

export const vitaminService = new VitaminService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
