import { Statistic } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class StatisticService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public FetchAnimals = async (): Promise<ApiResult<Statistic[]>> => this.get<Statistic[]>(`animal/statstics_for_admin`);

  public FetchFeature = async (): Promise<ApiResult<Statistic[]>> => this.get<Statistic[]>(`animal/statstics_feature_for_admin`);

  public FetchunReadQrs = async (): Promise<ApiResult<number>> => this.get<number>(`qr_request/number_unprinted_requestqrs`);

  public FetchunReadFeatures = async (): Promise<ApiResult<number>> => this.get<number>(`userfeature/number_unapproved_features`);

  public FetchunReadAnimals = async (): Promise<ApiResult<number>> => this.get<number>(`animal/number_unapproved_animals`);
}

export const statisticService = new StatisticService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
