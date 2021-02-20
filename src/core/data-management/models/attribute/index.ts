//---------------Attribute-Req.ts---------------
export interface Attribute_Req {
  'name:ar': string;
  'name:en': string;
  category_id: string;
}

//---------------Attribute.ts---------------
export interface Attribute {
  id: number;
  'name:ar': string;
  'name:en': string;
  category_id: string;
}

//---------------Attribute-I-Req.ts---------------

export interface Attribute_I_Req {
  attribute: Attribute_Req;
}

//---------------Attribute-U-Req.ts---------------

export interface Attribute_U_Req {
  id: number;
  attribute: Attribute_Req;
}

//---------------Attribute-D-Req.ts---------------
export interface Attribute_D_Req {
  id: number;
}

//---------------Attribute-S-Req.ts---------------
export interface Attribute_S_Req {
  id: number;
}
