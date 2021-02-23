import {
  Pollination,
  Pollination_D_Req,
  Pollination_I_Req,
  Pollination_S_Req,
  Pollination_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class PollinationService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Pollination[]>> =>
    this.get<Pollination[]>(`pollinations`);

  public Insert = async ({
    pollination,
  }: Pollination_I_Req): Promise<ApiResult<Pollination>> =>
    this.post<Pollination>(`pollination/store`, {
      animal_no_1: pollination.female_no,
      animal_no_2: pollination.male_no,
      duration: pollination.duration,
    });

  public Update = async ({
    pollination,
    id,
  }: Pollination_U_Req): Promise<ApiResult<Pollination>> =>
    this.put<Pollination>(`pollinations/${id}`, pollination);

  public Delete = async ({
    id,
  }: Pollination_D_Req): Promise<ApiResult<Pollination>> =>
    this.delete<Pollination>(`pollination/delete/${id}`);

  public Show = async ({
    id,
  }: Pollination_S_Req): Promise<ApiResult<Pollination>> =>
    this.get<Pollination>(`pollination/show/${id}`);
}

export const pollinationService = new PollinationService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
