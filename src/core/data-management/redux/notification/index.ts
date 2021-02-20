import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  notificationService,
  Notification,
  Notification_U_Req,
  Notification_S_Req,
  Notification_I_Req,
  Notification_D_Req,
} from '@core';

interface NotificationsState {
  status: RequestStatus;
  notifications: Notification[];
  notification?: Notification;
}

let initialState: NotificationsState = {
  status: 'no-thing',
  notifications: [],
};

const NotificationsSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertNotification: (
      { notifications },
      { payload }: PayloadAction<Notification>
    ) => {
      notifications.push(payload);
    },
    ShowNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.notification = payload;
    },
    UpdateNotification: (state, { payload }: PayloadAction<Notification>) => {
      let ind = state.notifications.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.notifications[ind] = payload;
    },
    DeleteNotification: (
      { notifications },
      { payload }: PayloadAction<number>
    ) => {
      let index = notifications.findIndex((el) => el.id === payload);
      if (index !== -1) notifications.splice(index, 1);
    },
    FetchNotifications: (state, { payload }: PayloadAction<Notification[]>) => {
      state.notifications = payload;
    },
  },
});

const {
  setStatus,
  InsertNotification,
  UpdateNotification,
  DeleteNotification,
  FetchNotifications,
  ShowNotification,
} = NotificationsSlice.actions;

export const InsertNotificationAsync = (
  req: Notification_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await notificationService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertNotification(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowNotificationAsync = (
  req: Notification_S_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await notificationService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowNotification(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateNotificationAsync = (
  req: Notification_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await notificationService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateNotification(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteNotificationAsync = (
  req: Notification_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await notificationService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteNotification(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchNotificationsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await notificationService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchNotifications(result.data));
    dispatch(setStatus('data'));
  }
};

export default NotificationsSlice.reducer;
