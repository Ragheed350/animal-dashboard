import {
  Feature,
  Feature_D_Req,
  Feature_I_Req,
  Feature_S_Req,
  Feature_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class FeatureService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Feature[]>> =>
    this.get<Feature[]>(`features`);

  public Insert = async ({
    feature,
  }: Feature_I_Req): Promise<ApiResult<Feature>> =>
    this.post<Feature>(`features`, feature);

  public Update = async ({
    feature,
    id,
  }: Feature_U_Req): Promise<ApiResult<Feature>> =>
    this.put<Feature>(`features/${id}`, feature);

  public Delete = async ({ id }: Feature_D_Req): Promise<ApiResult<Feature>> =>
    this.delete<Feature>(`feature/soft_delete/${id}`);

  public Show = async ({ id }: Feature_S_Req): Promise<ApiResult<Feature>> =>
    this.get<Feature>(`feature/show/${id}`);
}

export const featureService = new FeatureService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
