import { ApiService, ApiResult } from '@utils';
import { User, User_D_Req, User_I_Req, User_S_Req, User_U_Req } from '@core';
import { AxiosRequestConfig } from 'axios';

export class UserService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<User[]>> =>
    this.get<User[]>(`users`);

  public Insert = async ({ user }: User_I_Req): Promise<ApiResult<User>> =>
    this.post<User>(`users`, user);

  public Update = async ({ user, id }: User_U_Req): Promise<ApiResult<User>> =>
    this.put<User>(`users/${id}`, user);

  public Delete = async ({ id }: User_D_Req): Promise<ApiResult<User>> =>
    this.delete<User>(`user/soft_delete/${id}`);

  public Show = async ({ id }: User_S_Req): Promise<ApiResult<User>> =>
    this.get<User>(`users/${id}`);
}

export const userService = new UserService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
