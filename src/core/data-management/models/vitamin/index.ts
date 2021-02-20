import { Category } from '..';

//---------------Vitamin-Req.ts---------------
export interface Vitamin_Req {
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  category_id: number;
}

//---------------Vitamin.ts---------------
export interface Vitamin {
  id: number;
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  created_at?: Date;
  category: Category[];
}
//---------------Vitamin-I-Req.ts---------------

export interface Vitamin_I_Req {
  vitamin: Vitamin_Req;
}

//---------------Vitamin-U-Req.ts---------------

export interface Vitamin_U_Req {
  id: number;
  vitamin: Vitamin_Req;
}

//---------------Vitamin-D-Req.ts---------------
export interface Vitamin_D_Req {
  id: number;
}

//---------------Vitamin-S-Req.ts---------------
export interface Vitamin_S_Req {
  id: number;
}
