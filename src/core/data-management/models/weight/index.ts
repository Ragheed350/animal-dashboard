//---------------Weight-Req.ts---------------
export interface Weight_Req {
  value: string;
  animal_id: string;
}

//---------------Weight.ts---------------
export interface Weight {
  id: number;
  value: string;
  animal_id: string;
  weight_date: string;
}

//---------------Weight-I-Req.ts---------------

export interface Weight_I_Req {
  weight: Weight_Req;
}

//---------------Weight-U-Req.ts---------------

export interface Weight_U_Req {
  id: number;
  weight: Weight_Req;
}

//---------------Weight-D-Req.ts---------------
export interface Weight_D_Req {
  id: number;
}

//---------------Weight-S-Req.ts---------------
export interface Weight_S_Req {
  id: number;
}
