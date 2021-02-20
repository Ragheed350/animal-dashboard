//---------------FarmRate-Req.ts---------------
export interface FarmRate_Req {}

//---------------FarmRate.ts---------------
export interface FarmRate {}

//---------------FarmRate-I-Req.ts---------------

export interface FarmRate_I_Req {
  farmRate: FarmRate_Req;
}

//---------------FarmRate-U-Req.ts---------------

export interface FarmRate_U_Req {
  id: number;
  farmRate: FarmRate_Req;
}

//---------------FarmRate-D-Req.ts---------------
export interface FarmRate_D_Req {
  id: number;
}

//---------------FarmRate-S-Req.ts---------------
export interface FarmRate_S_Req {
  id: number;
}
