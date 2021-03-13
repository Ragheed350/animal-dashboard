import { Animal } from '@core';

//---------------ApproveAnimal-Req.ts---------------
export interface ApproveAnimal_Req {
  id: number;
  user_id: number;
}

export interface ApproveAnimal {
  animal: Animal;
}

//---------------ApproveAnimal-I-Req.ts---------------

export interface ApproveAnimal_I_Req {
  animal: Animal;
}

//---------------ApproveAnimal-U-Req.ts---------------

export interface ApproveAnimal_U_Req {
  id: number;
  animal: Animal;
}

//---------------ApproveAnimal-D-Req.ts---------------
export interface ApproveAnimal_D_Req {
  id: number;
}

//---------------ApproveAnimal-S-Req.ts---------------
export interface ApproveAnimal_S_Req {
  id: number;
}
