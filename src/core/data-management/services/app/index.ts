import { User } from 'src/core/data-management/models';
import { ApiService, ApiResult } from 'src/core/utils';

class AppServices extends ApiService {
  constructor() {
    super({ baseURL: `/api` });
  }
  public changeLang = async (req: { lang: string }): Promise<ApiResult<undefined>> => this.post<undefined>(`/change-lang`, req);

  public logout = async (): Promise<ApiResult<undefined>> => this.post<undefined>(`/logout`);

  public getUser = async (): Promise<ApiResult<User>> => this.post<User>(`/get-user`);
}

export const appServices = new AppServices();
