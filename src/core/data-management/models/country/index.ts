//---------------Country-Req.ts---------------
export interface Country_Req {
  'name:ar': string;
  'name:en': string;
}

//---------------Country.ts---------------
export interface Country {
  id: number;
  'name:ar': string;
  'name:en': string;
}

//---------------Country-I-Req.ts---------------

export interface Country_I_Req {
  country: Country_Req;
}

//---------------Country-U-Req.ts---------------

export interface Country_U_Req {
  id: number;
  country: Country_Req;
}

//---------------Country-D-Req.ts---------------
export interface Country_D_Req {
  id: number;
}

//---------------Country-S-Req.ts---------------
export interface Country_S_Req {
  id: number;
}
