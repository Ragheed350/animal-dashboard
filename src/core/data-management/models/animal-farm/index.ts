//---------------AnimalFarm-Req.ts---------------
export interface AnimalFarm_Req {}

//---------------AnimalFarm-I-Req.ts---------------

export interface AnimalFarm_I_Req {
  animalFarm: AnimalFarm_Req;
}

//---------------AnimalFarm-U-Req.ts---------------

export interface AnimalFarm_U_Req {
  id: number;
  animalFarm: AnimalFarm_Req;
}

//---------------AnimalFarm-D-Req.ts---------------
export interface AnimalFarm_D_Req {
  id: number;
}

//---------------AnimalFarm-S-Req.ts---------------
export interface AnimalFarm_S_Req {
  id: number;
}
