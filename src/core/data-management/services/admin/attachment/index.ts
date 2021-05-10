import { Attachment, Attachment_D_Req, Attachment_I_Req, Attachment_S_Req, Attachment_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class AttachmentService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Attachment[]>> => this.get<Attachment[]>(`attachments`);

  public Insert = async ({ attachment }: Attachment_I_Req): Promise<ApiResult<Attachment>> =>
    this.post<Attachment>(`attachments`, attachment, undefined);

  public Update = async ({ attachment, id }: Attachment_U_Req): Promise<ApiResult<Attachment>> =>
    this.post<Attachment>(`attachment/update/${id}`, attachment);

  public Delete = async ({ id }: Attachment_D_Req): Promise<ApiResult<Attachment>> =>
    this.delete<Attachment>(`attachment/destroy/${id}`);

  public Show = async ({ id }: Attachment_S_Req): Promise<ApiResult<Attachment>> => this.get<Attachment>(`attachment/${id}`);
}

export const attachmentService = new AttachmentService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
