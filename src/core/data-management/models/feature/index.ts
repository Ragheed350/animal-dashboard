//---------------Feature-Req.ts---------------
export interface Feature_Req {
  value: string;
  animal_id: string;
}

//---------------Feature.ts---------------
export interface Feature {
  id: number;
  value: string;
  price: string;
  limit: string;
  'text:ar'?: string;
  'text:en'?: string;
  category_id: string;
}
export interface FeatureForApprove {
  id: number;
  user_id: string;
  feature_id: string;
  is_approved: string;
}

export interface FeatureForApprove_Req {
  user_id: string;
  feature_id: string;
}

//---------------Feature-I-Req.ts---------------

export interface Feature_I_Req {
  feature: Feature_Req;
}

//---------------Feature-U-Req.ts---------------

export interface Feature_U_Req {
  id: number;
  feature: Feature_Req;
}

//---------------Feature-D-Req.ts---------------
export interface Feature_D_Req {
  id: number;
}

//---------------Feature-S-Req.ts---------------
export interface Feature_S_Req {
  id: number;
}
