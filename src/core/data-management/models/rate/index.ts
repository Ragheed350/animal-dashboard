//---------------Rate-Req.ts---------------
export interface Rate_Req {
  user_id: string;
  animal_id: string;
  value: string;
}

//---------------Rate.ts---------------
export interface Rate {
  id: number;
  user_id: string;
  animal_id: string;
  value: string;
}

//---------------Rate-I-Req.ts---------------

export interface Rate_I_Req {
  rate: Rate_Req;
}

//---------------Rate-U-Req.ts---------------

export interface Rate_U_Req {
  id: number;
  rate: Rate_Req;
}

//---------------Rate-D-Req.ts---------------
export interface Rate_D_Req {
  id: number;
}

//---------------Rate-S-Req.ts---------------
export interface Rate_S_Req {
  id: number;
}
