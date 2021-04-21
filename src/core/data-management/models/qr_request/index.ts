//---------------QR_Request-Req.ts---------------
export interface QR_Request_Req {
  user_id: string;
  animal_id: string;
}

//---------------QR_Request.ts---------------
export interface QR_Request {
  id: number;
  user_id: string;
  animal_id: string;
  is_printed: string;
}

//---------------QR_Request-I-Req.ts---------------

export interface QR_Request_I_Req {
  QR_Request: QR_Request_Req;
}

//---------------QR_Request-U-Req.ts---------------

export interface QR_Request_U_Req {
  id: number;
  QR_Request: QR_Request_Req;
}

//---------------QR_Request-D-Req.ts---------------
export interface QR_Request_D_Req {
  id: number;
}

//---------------QR_Request-S-Req.ts---------------
export interface QR_Request_S_Req {
  id: number;
}
