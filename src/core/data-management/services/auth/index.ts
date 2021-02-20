import {
  Login_Res,
  Login_Req,
  SignUp_Req,
  SignUp_Res,
} from 'src/core/data-management/models';
import { ApiService, ApiResult } from 'src/core/utils';

class AuthServices extends ApiService {
  constructor() {
    super({ baseURL: `/api/proxy/` });
  }
  public signup = async (req: SignUp_Req): Promise<ApiResult<SignUp_Res>> =>
    this.post<SignUp_Res>(`guest/register`, req);

  public login = async (req: Login_Req): Promise<ApiResult<Login_Res>> =>
    this.post<Login_Res>(`admin/login`, req);

  public adminLogin = async (req: Login_Req): Promise<ApiResult<Login_Res>> =>
    this.post<Login_Res>(`guest/login-as-admin`, req);

  public check = async (req: SignUp_Req): Promise<ApiResult<SignUp_Res>> =>
    this.post<SignUp_Res>(`guest/register`, req);
}

export const authServices = new AuthServices();
