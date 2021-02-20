//---------------Notification-Req.ts---------------
export interface Notification_Req {
  'text:ar': string;
  'text:en': string;
  animal_id: string;
  user_id: string;
}

//---------------Notification.ts---------------
export interface Notification {
  id: number;
  'text:ar': string;
  'text:en': string;
  is_read: '0' | '1';
  animal_id: string;
  user_id: string;
}

//---------------Notification-I-Req.ts---------------

export interface Notification_I_Req {
  notification: Notification_Req;
}

//---------------Notification-U-Req.ts---------------

export interface Notification_U_Req {
  id: number;
  notification: Notification_Req;
}

//---------------Notification-D-Req.ts---------------
export interface Notification_D_Req {
  id: number;
}

//---------------Notification-S-Req.ts---------------
export interface Notification_S_Req {
  id: number;
}
