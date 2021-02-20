import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  rateService,
  Rate,
  Rate_U_Req,
  Rate_S_Req,
  Rate_I_Req,
  Rate_D_Req,
} from '@core';

interface RatesState {
  status: RequestStatus;
  rates: Rate[];
  rate?: Rate;
}

let initialState: RatesState = {
  status: 'no-thing',
  rates: [],
};

const RatesSlice = createSlice({
  name: 'Rates',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertRate: ({ rates }, { payload }: PayloadAction<Rate>) => {
      rates.push(payload);
    },
    ShowRate: (state, { payload }: PayloadAction<Rate>) => {
      state.rate = payload;
    },
    UpdateRate: (state, { payload }: PayloadAction<Rate>) => {
      let ind = state.rates.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.rates[ind] = payload;
    },
    DeleteRate: ({ rates }, { payload }: PayloadAction<number>) => {
      let index = rates.findIndex((el) => el.id === payload);
      if (index !== -1) rates.splice(index, 1);
    },
    FetchRates: (state, { payload }: PayloadAction<Rate[]>) => {
      state.rates = payload;
    },
  },
});

const {
  setStatus,
  InsertRate,
  UpdateRate,
  DeleteRate,
  FetchRates,
  ShowRate,
} = RatesSlice.actions;

export const InsertRateAsync = (req: Rate_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await rateService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertRate(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowRateAsync = (req: Rate_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await rateService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowRate(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateRateAsync = (req: Rate_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await rateService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateRate(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteRateAsync = (req: Rate_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await rateService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteRate(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchRatesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await rateService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchRates(result.data));
    dispatch(setStatus('data'));
  }
};

export default RatesSlice.reducer;
