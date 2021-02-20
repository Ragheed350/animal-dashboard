import {
  Category,
  Category_D_Req,
  Category_I_Req,
  Category_S_Req,
  Category_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class CategoryService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Category[]>> =>
    this.get<Category[]>(`admin/categories`);

  public FetchParent = async (): Promise<ApiResult<Category[]>> =>
    this.get<Category[]>(`user/category/getparentcategories`);

  public FetchChildren = async (id: number): Promise<ApiResult<Category[]>> =>
    this.get<Category[]>(`admin/category/subcategory?parent_id=${id}`);

  public FetchLevel2 = async (): Promise<ApiResult<Category[]>> =>
    this.get<Category[]>(`admin/category/get_level2_categories`);

  public FetchLevel3 = async (): Promise<ApiResult<Category[]>> =>
    this.get<Category[]>(`admin/category/get_level3_categories`);

  public Insert = async ({
    category,
  }: Category_I_Req): Promise<ApiResult<Category>> =>
    this.post<Category>(`admin/categories`, category);

  public Update = async ({
    category,
    id,
  }: Category_U_Req): Promise<ApiResult<Category>> =>
    this.post<Category>(`admin/category/update/${id}`, category);

  public Delete = async ({
    id,
  }: Category_D_Req): Promise<ApiResult<Category>> =>
    this.delete<Category>(`category/soft_delete/${id}`);

  public Show = async ({ id }: Category_S_Req): Promise<ApiResult<Category>> =>
    this.get<Category>(`category/show/${id}`);
}

export const categoryService = new CategoryService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
