//---------------DisplayCategory-Req.ts---------------
export interface DisplayCategory_Req {
  'name:ar': string;
  'name:en': string;
  is_featured: '0' | '1';
}

//---------------DisplayCategory.ts---------------
export interface DisplayCategory {
  id: number;
  'name:ar': string;
  'name:en': string;
  is_featured: '0' | '1';
}

//---------------DisplayCategory-I-Req.ts---------------

export interface DisplayCategory_I_Req {
  displayCategory: DisplayCategory_Req;
}

//---------------DisplayCategory-U-Req.ts---------------

export interface DisplayCategory_U_Req {
  id: number;
  displayCategory: DisplayCategory_Req;
}

//---------------DisplayCategory-D-Req.ts---------------
export interface DisplayCategory_D_Req {
  id: number;
}

//---------------DisplayCategory-S-Req.ts---------------
export interface DisplayCategory_S_Req {
  id: number;
}
