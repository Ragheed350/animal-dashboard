import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  qr_requestService,
  QR_Request,
  QR_Request_U_Req,
  QR_Request_S_Req,
  QR_Request_I_Req,
  QR_Request_D_Req,
} from '@core';

interface QR_RequestState {
  status: RequestStatus;
  qr_requests: QR_Request[];
  qr_request?: QR_Request;
}

let initialState: QR_RequestState = {
  status: 'no-thing',
  qr_requests: [],
};

const QR_RequestSlice = createSlice({
  name: 'QR_Request',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertQR_Request: ({ qr_requests }, { payload }: PayloadAction<QR_Request>) => {
      qr_requests.push(payload);
    },
    ShowQR_Request: (state, { payload }: PayloadAction<QR_Request>) => {
      state.qr_request = payload;
    },
    UpdateQR_Request: (state, { payload }: PayloadAction<QR_Request>) => {
      let ind = state.qr_requests.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.qr_requests[ind] = payload;
    },
    DeleteQR_Request: ({ qr_requests }, { payload }: PayloadAction<number>) => {
      let index = qr_requests.findIndex((el) => el.id === payload);
      if (index !== -1) qr_requests.splice(index, 1);
    },
    FetchQR_Request: (state, { payload }: PayloadAction<QR_Request[]>) => {
      state.qr_requests = payload;
    },
  },
});

const {
  setStatus,
  InsertQR_Request,
  UpdateQR_Request,
  DeleteQR_Request,
  FetchQR_Request,
  ShowQR_Request,
} = QR_RequestSlice.actions;

export const InsertQR_RequestAsync = (req: QR_Request_I_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertQR_Request(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowQR_RequestAsync = (req: QR_Request_S_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowQR_Request(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateQR_RequestAsync = (req: QR_Request_U_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateQR_Request(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteQR_RequestAsync = (req: QR_Request_D_Req): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteQR_Request(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchQR_RequestsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchQR_Request(result.data));
    dispatch(setStatus('data'));
  }
};

export const PrintQRAsync = (id: number): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await qr_requestService.PrintQR(id);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateQR_Request(result.data));
    dispatch(setStatus('data'));
  }
};

export default QR_RequestSlice.reducer;
