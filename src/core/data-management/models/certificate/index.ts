//---------------Certificate-Req.ts---------------
export interface Certificate_Req {
  animal_id: number;
  title: string;
  pdf: File;
}

//---------------Certificate.ts---------------
export interface Certificate {
  id: number;
  url: string;
  title: string;
  animal_id: string;
}

//---------------Certificate-I-Req.ts---------------

export interface Certificate_I_Req {
  certificate: Certificate_Req;
}

//---------------Certificate-U-Req.ts---------------

export interface Certificate_U_Req {
  id: number;
  certificate: Certificate_Req;
}

//---------------Certificate-D-Req.ts---------------
export interface Certificate_D_Req {
  id: number;
}

//---------------Certificate-S-Req.ts---------------
export interface Certificate_S_Req {
  id: number;
}
