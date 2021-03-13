//---------------Farm-Req.ts---------------
export interface Farm_Req {
  id: string;
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  code: string;
  latitude: string;
  longitude: string;
  logo: string;
}

//---------------Farm.ts---------------
export interface Farm {
  id: number;
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  owner_id: string;
  latLng: string;
  code: string;
  rate: number;
  logo: string;
}

//---------------Farm-I-Req.ts---------------

export interface Farm_I_Req {
  farm: Farm_Req;
}

//---------------Farm-U-Req.ts---------------

export interface Farm_U_Req {
  id: number;
  farm: Farm_Req;
}

//---------------Farm-D-Req.ts---------------
export interface Farm_D_Req {
  id: number;
}

//---------------Farm-S-Req.ts---------------
export interface Farm_S_Req {
  id: number;
}
