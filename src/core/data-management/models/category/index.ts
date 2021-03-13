//---------------Category-Req.ts---------------
export interface Category_Req {
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  parent_id: null | string;
  image: File | Blob;
}

//---------------Category.ts---------------
export interface Category {
  id: number;
  'name:ar': string;
  'name:en': string;
  'description:ar': string;
  'description:en': string;
  parent_id: null | string;
  image: string;
  pregnancy: string;
}

//---------------Category-I-Req.ts---------------

export interface Category_I_Req {
  category: Category_Req;
}

//---------------Category-U-Req.ts---------------

export interface Category_U_Req {
  id: number;
  category: Category_Req;
}

//---------------Category-D-Req.ts---------------
export interface Category_D_Req {
  id: number;
}

//---------------Category-S-Req.ts---------------
export interface Category_S_Req {
  id: number;
}
