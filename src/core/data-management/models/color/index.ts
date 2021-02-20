//---------------Color-Req.ts---------------
export interface Color_Req {
  'name:ar': string;
  'name:en': string;
}

//---------------Color.ts---------------
export interface Color {
  id: number;
  'name:ar': string;
  'name:en': string;
}

//---------------Color-I-Req.ts---------------

export interface Color_I_Req {
  color: Color_Req;
}

//---------------Color-U-Req.ts---------------

export interface Color_U_Req {
  id: number;
  color: Color_Req;
}

//---------------Color-D-Req.ts---------------
export interface Color_D_Req {
  id: number;
}

//---------------Color-S-Req.ts---------------
export interface Color_S_Req {
  id: number;
}
