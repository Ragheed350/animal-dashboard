import {
  Feature,
  FeatureForApprove,
  FeatureForApprove_Req,
  Feature_D_Req,
  Feature_I_Req,
  Feature_S_Req,
  Feature_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class FeatureService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Feature[]>> =>
    this.get<Feature[]>(`features`);

  public Insert = async ({ feature }: Feature_I_Req) =>
    this.post<Feature>(`features`, feature);

  public Update = async ({ feature, id }: Feature_U_Req) =>
    this.put<Feature>(`features/${id}`, feature);

  public Delete = async ({ id }: Feature_D_Req) =>
    this.delete<Feature>(`feature/soft_delete/${id}`);

  public Show = async ({ id }: Feature_S_Req) =>
    this.get<Feature>(`feature/show/${id}`);

  public list = async () => this.get<FeatureForApprove[]>(`userfeatures`);

  public add = async (req: FeatureForApprove_Req) =>
    this.post<FeatureForApprove>(`userfeatures`, req);

  public remove = async ({
    id,
    feature_id,
    user_id,
  }: FeatureForApprove_Req & { id: number }) =>
    this.delete<FeatureForApprove>(`userfeature/delete/${id}`, {
      params: {
        feature_id,
        user_id,
      },
    });

  public approve = async ({
    feature_id,
    id,
    user_id,
  }: {
    id: number | string;
    user_id: number | string;
    feature_id: number | string;
  }) =>
    this.post<FeatureForApprove>(`userfeature/Approve_Feature/${id}`, {
      user_id,
      feature_id,
    });
}

export const featureService = new FeatureService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
