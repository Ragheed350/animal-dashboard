import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  certificateService,
  Certificate,
  Certificate_U_Req,
  Certificate_S_Req,
  Certificate_I_Req,
  Certificate_D_Req,
} from '@core';

interface CertificatesState {
  status: RequestStatus;
  certificates: Certificate[];
  certificate?: Certificate;
}

let initialState: CertificatesState = {
  status: 'no-thing',
  certificates: [],
};

const CertificatesSlice = createSlice({
  name: 'Certificates',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertCertificate: (
      { certificates },
      { payload }: PayloadAction<Certificate>
    ) => {
      certificates.push(payload);
    },
    ShowCertificate: (state, { payload }: PayloadAction<Certificate>) => {
      state.certificate = payload;
    },
    UpdateCertificate: (state, { payload }: PayloadAction<Certificate>) => {
      let ind = state.certificates.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.certificates[ind] = payload;
    },
    DeleteCertificate: (
      { certificates },
      { payload }: PayloadAction<number>
    ) => {
      let index = certificates.findIndex((el) => el.id === payload);
      if (index !== -1) certificates.splice(index, 1);
    },
    FetchCertificates: (state, { payload }: PayloadAction<Certificate[]>) => {
      state.certificates = payload;
    },
  },
});

const {
  setStatus,
  InsertCertificate,
  UpdateCertificate,
  DeleteCertificate,
  FetchCertificates,
  ShowCertificate,
} = CertificatesSlice.actions;

export const InsertCertificateAsync = (
  req: Certificate_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await certificateService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCertificate(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCertificateAsync = (
  req: Certificate_S_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await certificateService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCertificate(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCertificateAsync = (
  req: Certificate_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await certificateService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCertificate(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCertificateAsync = (
  req: Certificate_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await certificateService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCertificate(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCertificatesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await certificateService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCertificates(result.data));
    dispatch(setStatus('data'));
  }
};

export default CertificatesSlice.reducer;
