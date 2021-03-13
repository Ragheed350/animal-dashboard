import {
  ApproveAnimal,
  ApproveAnimal_D_Req,
  ApproveAnimal_I_Req,
  ApproveAnimal_S_Req,
  ApproveAnimal_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class ApproveAnimalService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<ApproveAnimal[]>> =>
    this.get<ApproveAnimal[]>(`approveAnimals`);

  public Insert = async ({
    animal,
  }: ApproveAnimal_I_Req): Promise<ApiResult<ApproveAnimal>> =>
    this.post<ApproveAnimal>(`approveAnimals`, animal);

  public Update = async ({
    animal,
    id,
  }: ApproveAnimal_U_Req): Promise<ApiResult<ApproveAnimal>> =>
    this.post<ApproveAnimal>(`approveAnimal/update/${id}`, animal);

  public Delete = async ({
    id,
  }: ApproveAnimal_D_Req): Promise<ApiResult<ApproveAnimal>> =>
    this.delete<ApproveAnimal>(`approveAnimal/soft_delete/${id}`);

  public Show = async ({
    id,
  }: ApproveAnimal_S_Req): Promise<ApiResult<ApproveAnimal>> =>
    this.get<ApproveAnimal>(`approveAnimal/${id}`);
}

export const approveAnimalService = new ApproveAnimalService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
