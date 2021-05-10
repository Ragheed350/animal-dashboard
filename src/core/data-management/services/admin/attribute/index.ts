import { Attribute, Attribute_D_Req, Attribute_I_Req, Attribute_S_Req, Attribute_U_Req } from '@core';
import { AxiosRequestConfig } from 'axios';
import { ApiService, ApiResult } from '@utils';

export class AttributeService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Attribute[]>> => this.get<Attribute[]>(`attributes`);

  public FetchByAnimal = async (id: number): Promise<ApiResult<Attribute[]>> =>
    this.get<Attribute[]>(`attribute/showbycategory?animal_id=${id}`);

  public Insert = async ({ attribute }: Attribute_I_Req): Promise<ApiResult<Attribute>> =>
    this.post<Attribute>(`attributes`, attribute);

  public Update = async ({ attribute, id }: Attribute_U_Req): Promise<ApiResult<Attribute>> =>
    this.put<Attribute>(`attributes/${id}`, attribute);

  public Delete = async ({ id }: Attribute_D_Req): Promise<ApiResult<Attribute>> =>
    this.delete<Attribute>(`attribute/destroy/${id}`);

  public Show = async ({ id }: Attribute_S_Req): Promise<ApiResult<Attribute>> => this.get<Attribute>(`attribute/show/${id}`);
}

export const attributeService = new AttributeService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
