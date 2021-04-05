//---------------Animal-Req.ts---------------
export interface Animal_Req {
  [x: string]: any;
  animal_no: string;
  'name:ar': string;
  'name:en': string;
  birth_date: string;
  gender: '0' | '1';
  father_no?: string;
  mother_no?: string;
  country_id: string;
  color_id: string;
  category_id: string;
  for_buy?: '1' | '0';
  is_shown?: '1' | '0';
  is_dead?: '1' | '0';
  approved?: '1' | '0';
  weight?: string;
  image: Blob[] | File[];
}

//---------------Animal.ts---------------
export interface Animal {
  id: number;
  animal_no: string;
  'name:ar': string;
  'name:en': string;
  birth_date: string;
  gender: '0' | '1';
  father_id: null | number;
  mother_id: null | number;
  country_id: number;
  'country:ar': string;
  'country:en': string;
  color_id: number;
  'color:ar': string;
  'color:en': string;
  category_id: string;
  for_buy: '0' | '1';
  price?: string;
  puyer_data?: string;
  is_shown: '0' | '1';
  qr: string;
  qr_image: string;
  display_category_id: string;
  is_dead: '1' | '0';
  approved: 1 | 0;
  nfc: string;
  nfc_location: string;
  farm: AnimalFarm[];
  attachments: Attachment[];
  Weight: Weight[];
  rate: number;
  age: number;
}

//---------------Animal-I-Req.ts---------------

export interface Animal_I_Req {
  animal: Animal_Req;
}

//---------------Animal-U-Req.ts---------------

export interface Animal_U_Req {
  id: number;
  animal: Animal_Req;
}

//---------------Animal-D-Req.ts---------------
export interface Animal_D_Req {
  id: number;
}

//---------------Animal-S-Req.ts---------------
export interface Animal_S_Req {
  id: number;
}

export interface AnimalFarm {
  id: 3;
  farm_id: string;
  animal_id: string;
  quantity: string;
  'name:ar'?: string;
  'name:en'?: string;
  'description:ar'?: string;
  'description:en'?: string;
}
interface Attachment {
  id: number;
  url: string;
  type: string;
  animal_id: string;
}

interface Weight {
  id: number;
  value: string;
  animal_id: string;
  weight_date: Date;
}
