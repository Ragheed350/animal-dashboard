import { Vaccinate, Vaccinate_D_Req, Vaccinate_I_Req, Vaccinate_S_Req, Vaccinate_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class VaccinateService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Vaccinate[]>> => this.get<Vaccinate[]>(`vaccinates`);

  public Insert = async ({ vaccinate }: Vaccinate_I_Req): Promise<ApiResult<Vaccinate>> =>
    this.post<Vaccinate>(`vaccinates`, vaccinate);

  public Update = async ({ vaccinate, id }: Vaccinate_U_Req): Promise<ApiResult<Vaccinate>> =>
    this.put<Vaccinate>(`vaccinates/${id}`, vaccinate);

  public Delete = async ({ id }: Vaccinate_D_Req): Promise<ApiResult<Vaccinate>> =>
    this.delete<Vaccinate>(`vaccinate/destroy/${id}`);

  public Show = async ({ id }: Vaccinate_S_Req): Promise<ApiResult<Vaccinate>> => this.get<Vaccinate>(`vaccinate/show/${id}`);
}

export const vaccinateService = new VaccinateService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
