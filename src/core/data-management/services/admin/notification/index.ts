import { Notification, Notification_D_Req, Notification_I_Req, Notification_S_Req, Notification_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class NotificationService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Notification[]>> => this.get<Notification[]>(`notifications`);

  public Insert = async ({ notification }: Notification_I_Req): Promise<ApiResult<Notification>> =>
    this.post<Notification>(`notifications`, notification);

  public Update = async ({ notification, id }: Notification_U_Req): Promise<ApiResult<Notification>> =>
    this.put<Notification>(`notifications/${id}`, notification);

  public Delete = async ({ id }: Notification_D_Req): Promise<ApiResult<Notification>> =>
    this.delete<Notification>(`notification/destroy/${id}`);

  public Show = async ({ id }: Notification_S_Req): Promise<ApiResult<Notification>> =>
    this.get<Notification>(`notification/show/${id}`);
}

export const notificationService = new NotificationService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
