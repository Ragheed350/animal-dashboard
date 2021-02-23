import {
  Certificate,
  Certificate_D_Req,
  Certificate_I_Req,
  Certificate_S_Req,
  Certificate_U_Req,
} from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class CertificateService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<Certificate[]>> =>
    this.get<Certificate[]>(`certificates`);

  public Insert = async ({
    certificate,
  }: Certificate_I_Req): Promise<ApiResult<Certificate>> =>
    this.post<Certificate>(`certificates`, certificate);

  public Update = async ({
    certificate,
    id,
  }: Certificate_U_Req): Promise<ApiResult<Certificate>> =>
    this.put<Certificate>(`certificates/${id}`, certificate);

  public Delete = async ({
    id,
  }: Certificate_D_Req): Promise<ApiResult<Certificate>> =>
    this.delete<Certificate>(`certificate/soft_delete/${id}`);

  public Show = async ({
    id,
  }: Certificate_S_Req): Promise<ApiResult<Certificate>> =>
    this.get<Certificate>(`certificate/show/${id}`);
}

export const certificateService = new CertificateService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
