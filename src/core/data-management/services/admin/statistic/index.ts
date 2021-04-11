import { Statistic } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class StatisticService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public FetchAnimals = async (): Promise<ApiResult<Statistic[]>> =>
    this.get<Statistic[]>(`animal/statstics_for_admin`);

  public FetchFeature = async (): Promise<ApiResult<Statistic[]>> =>
    this.get<Statistic[]>(`animal/statstics_feature_for_admin`);
}

export const statisticService = new StatisticService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
