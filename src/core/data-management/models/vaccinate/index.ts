//---------------Vaccinate-Req.ts---------------
export interface Vaccinate_Req {
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  category_id: number;
}

//---------------Vaccinate.ts---------------
export interface Vaccinate {
  id: number;
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  created_at?: string;
  category: [];
}

//---------------Vaccinate-I-Req.ts---------------

export interface Vaccinate_I_Req {
  vaccinate: Vaccinate_Req;
}

//---------------Vaccinate-U-Req.ts---------------

export interface Vaccinate_U_Req {
  id: number;
  vaccinate: Vaccinate_Req;
}

//---------------Vaccinate-D-Req.ts---------------
export interface Vaccinate_D_Req {
  id: number;
}

//---------------Vaccinate-S-Req.ts---------------
export interface Vaccinate_S_Req {
  id: number;
}
