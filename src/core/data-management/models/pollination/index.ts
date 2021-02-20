//---------------Pollination-Req.ts---------------
export interface Pollination_Req {
  male_no: string;
  female_no: string;
  duration: string;
}

//---------------Pollination.ts---------------
export interface Pollination {
  id: number;
  male_id: string;
  female_id: string;
  duration: string;
}

//---------------Pollination-I-Req.ts---------------

export interface Pollination_I_Req {
  pollination: Pollination_Req;
}

//---------------Pollination-U-Req.ts---------------

export interface Pollination_U_Req {
  id: number;
  pollination: Pollination_Req;
}

//---------------Pollination-D-Req.ts---------------
export interface Pollination_D_Req {
  id: number;
}

//---------------Pollination-S-Req.ts---------------
export interface Pollination_S_Req {
  id: number;
}
