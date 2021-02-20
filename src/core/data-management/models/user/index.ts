//---------------User-Req.ts---------------
export interface User_Req {
  'name:ar': string;
  'name:en': string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  gender: '1' | '0';
  marital: string;
  'nationallity:ar': string;
  'nationallity:en': string;
  'address:ar': string;
  'address:en': string;
  image: string;
  country_id: string;
  package_id: string;
}

//---------------User.ts---------------
export interface User {
  id: number;
  'name:ar': string;
  'name:en': string;
  email: string;
  phone: string;
  gender: '1' | '0';
  marital: string;
  is_suspended: string;
  'nationallity:ar': string;
  'nationallity:en': string;
  'address:ar': string;
  'address:en': string;
  image: string;
  country_id: string;
  package_id: string;
}

//---------------User-I-Req.ts---------------

export interface User_I_Req {
  user: User_Req;
}

//---------------User-U-Req.ts---------------

export interface User_U_Req {
  id: number;
  user: User_Req;
}

//---------------User-D-Req.ts---------------
export interface User_D_Req {
  id: number;
}

//---------------User-S-Req.ts---------------
export interface User_S_Req {
  id: number;
}
