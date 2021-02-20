import {
  Color,
  Color_D_Req,
  Color_I_Req,
  Color_S_Req,
  Color_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class ColorService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Color[]>> =>
    this.get<Color[]>(`colors`);

  public Insert = async ({ color }: Color_I_Req): Promise<ApiResult<Color>> =>
    this.post<Color>(`colors`, color);

  public Update = async ({
    color,
    id,
  }: Color_U_Req): Promise<ApiResult<Color>> =>
    this.put<Color>(`colors/${id}`, color);

  public Delete = async ({ id }: Color_D_Req): Promise<ApiResult<Color>> =>
    this.delete<Color>(`color/soft_delete/${id}`);

  public Show = async ({ id }: Color_S_Req): Promise<ApiResult<Color>> =>
    this.get<Color>(`color/show/${id}`);
}

export const colorService = new ColorService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
