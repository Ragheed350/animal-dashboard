import { QR_Request, QR_Request_D_Req, QR_Request_I_Req, QR_Request_S_Req, QR_Request_U_Req } from '@core';
import { ApiService, ApiResult } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class QR_RequestService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async (): Promise<ApiResult<QR_Request[]>> => this.get<QR_Request[]>(`qr_requests`);

  public Insert = async ({ QR_Request }: QR_Request_I_Req): Promise<ApiResult<QR_Request>> =>
    this.post<QR_Request>(`qr_requests`, QR_Request);

  public Update = async ({ QR_Request, id }: QR_Request_U_Req): Promise<ApiResult<QR_Request>> =>
    this.put<QR_Request>(`qr_requests/${id}`, QR_Request);

  public Delete = async ({ id }: QR_Request_D_Req): Promise<ApiResult<QR_Request>> =>
    this.delete<QR_Request>(`qr_request/delete/${id}`);

  public Show = async ({ id }: QR_Request_S_Req): Promise<ApiResult<QR_Request>> => this.get<QR_Request>(`qr_request/${id}`);

  public PrintQR = async (id: number): Promise<ApiResult<QR_Request>> => this.post<QR_Request>(`qr_request/print_qr/${id}`);
}

export const qr_requestService = new QR_RequestService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
