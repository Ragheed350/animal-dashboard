//---------------AnimalAttribute-Req.ts---------------
export interface AnimalAttribute_Req {}

//---------------AnimalAttribute.ts---------------
export interface AnimalAttribute {}

//---------------AnimalAttribute-I-Req.ts---------------

export interface AnimalAttribute_I_Req {
  animalAttribute: AnimalAttribute_Req;
}

//---------------AnimalAttribute-U-Req.ts---------------

export interface AnimalAttribute_U_Req {
  id: number;
  animalAttribute: AnimalAttribute_Req;
}

//---------------AnimalAttribute-D-Req.ts---------------
export interface AnimalAttribute_D_Req {
  id: number;
}

//---------------AnimalAttribute-S-Req.ts---------------
export interface AnimalAttribute_S_Req {
  id: number;
}
