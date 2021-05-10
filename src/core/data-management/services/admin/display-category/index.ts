import {
  DisplayCategory,
  DisplayCategory_D_Req,
  DisplayCategory_I_Req,
  DisplayCategory_S_Req,
  DisplayCategory_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class DisplayCategoryService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<DisplayCategory[]>> => this.get<DisplayCategory[]>(`displaycategories`);

  public Insert = async ({ displayCategory }: DisplayCategory_I_Req): Promise<ApiResult<DisplayCategory>> =>
    this.post<DisplayCategory>(`displaycategories`, displayCategory);

  public Update = async ({ displayCategory, id }: DisplayCategory_U_Req): Promise<ApiResult<DisplayCategory>> =>
    this.put<DisplayCategory>(`displaycategories/${id}`, displayCategory);

  public Delete = async ({ id }: DisplayCategory_D_Req): Promise<ApiResult<DisplayCategory>> =>
    this.delete<DisplayCategory>(`display_category/destroy/${id}`);

  public Show = async ({ id }: DisplayCategory_S_Req): Promise<ApiResult<DisplayCategory>> =>
    this.get<DisplayCategory>(`display_category/show/${id}`);
}

export const displayCategoryService = new DisplayCategoryService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
