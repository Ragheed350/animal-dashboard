import { ContactUs } from '@core';
import { ApiService } from '@utils';
import { AxiosRequestConfig } from 'axios';

export class ContactUsService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}admin/`, ...config });
  }

  public Fetch = async () => this.get<ContactUs[]>(`contacts`);

  public Delete = async (id: number) =>
    this.delete<ContactUs>(`contact/delete/${id}`);
}

export const contactUsService = new ContactUsService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}admin`,
});
