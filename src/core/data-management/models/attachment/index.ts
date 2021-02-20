//---------------Attachment-Req.ts---------------
export interface Attachment_Req {
  image: File | Blob;
  animal_id: number;
}

//---------------Attachment.ts---------------
export interface Attachment {
  id: number;
  url: string;
  type: string;
  animal_id: string;
}

//---------------Attachment-I-Req.ts---------------

export interface Attachment_I_Req {
  attachment: Attachment_Req;
}

//---------------Attachment-U-Req.ts---------------

export interface Attachment_U_Req {
  id: number;
  attachment: Attachment_Req;
}

//---------------Attachment-D-Req.ts---------------
export interface Attachment_D_Req {
  id: number;
}

//---------------Attachment-S-Req.ts---------------
export interface Attachment_S_Req {
  id: number;
}
