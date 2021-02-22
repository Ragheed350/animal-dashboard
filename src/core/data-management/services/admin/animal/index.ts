import {
  Animal,
  Animal_D_Req,
  Animal_I_Req,
  Animal_S_Req,
  Animal_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class AnimalService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Animal[]>> =>
    this.get<Animal[]>(`animals`);

  public Insert = async ({
    animal,
  }: Animal_I_Req): Promise<ApiResult<Animal>> =>
    this.post<Animal>(`animals`, animal);

  public Update = async ({
    animal,
    id,
  }: Animal_U_Req): Promise<ApiResult<Animal>> =>
    this.post<Animal>(`animal/update/${id}`, animal);

  public Delete = async ({ id }: Animal_D_Req): Promise<ApiResult<Animal>> =>
    this.delete<Animal>(`animal/soft_delete/${id}`);

  public Show = async ({ id }: Animal_S_Req): Promise<ApiResult<Animal>> =>
    this.get<Animal>(`animal/show/${id}`);
}

export const animalService = new AnimalService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});