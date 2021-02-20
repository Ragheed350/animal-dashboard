import { User } from 'src/core/data-management/models';

export interface Login_Req {
  email: string;
  password: string;
}

export interface Login_Res {
  user: User;
  token: string;
}

export interface SignUp_Req {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface SignUp_Res extends User {}

export interface ForgetPassword_Req {
  email: string;
}

export interface CheckPasswordCode_Req {
  phone: string;
  reset_password_code: string;
}

export interface ResetPassword_Req {
  phone: string;
  reset_password_code: string;
  password: string;
  password_confirmation: string;
}
