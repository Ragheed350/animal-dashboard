import {
  AnimalAttribute,
  AnimalAttribute_D_Req,
  AnimalAttribute_I_Req,
  AnimalAttribute_S_Req,
  AnimalAttribute_U_Req,
} from '@core';
import { AxiosRequestConfig } from 'axios';
import { ApiService, ApiResult } from '@utils';

export class AnimalAttributeService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<AnimalAttribute[]>> =>
    this.get<AnimalAttribute[]>(`animalattributes`);

  public FetchByAnimal = async (
    id: number
  ): Promise<ApiResult<AnimalAttribute[]>> =>
    this.get<AnimalAttribute[]>(`animalattribute/show?animal_id=${id}`);

  public Insert = async ({
    animalAttribute,
  }: AnimalAttribute_I_Req): Promise<ApiResult<AnimalAttribute>> =>
    this.post<AnimalAttribute>(`animalattributes`, animalAttribute);

  public Update = async ({
    animalAttribute,
    id,
  }: AnimalAttribute_U_Req): Promise<ApiResult<AnimalAttribute>> =>
    this.put<AnimalAttribute>(`animalattributes/${id}`, animalAttribute);

  public Delete = async ({
    id,
  }: AnimalAttribute_D_Req): Promise<ApiResult<AnimalAttribute>> =>
    this.delete<AnimalAttribute>(`animalattribute/delete/${id}`);

  public Show = async ({
    id,
  }: AnimalAttribute_S_Req): Promise<ApiResult<AnimalAttribute>> =>
    this.get<AnimalAttribute>(`animalattribute/show/${id}`);
}

export const animalAttributeService = new AnimalAttributeService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
