import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  pollinationService,
  Pollination,
  Pollination_U_Req,
  Pollination_S_Req,
  Pollination_I_Req,
  Pollination_D_Req,
} from '@core';

interface PollinationsState {
  status: RequestStatus;
  pollinations: Pollination[];
  pollination?: Pollination;
}

let initialState: PollinationsState = {
  status: 'no-thing',
  pollinations: [],
};

const PollinationsSlice = createSlice({
  name: 'Pollinations',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertPollination: (
      { pollinations },
      { payload }: PayloadAction<Pollination>
    ) => {
      pollinations.push(payload);
    },
    ShowPollination: (state, { payload }: PayloadAction<Pollination>) => {
      state.pollination = payload;
    },
    UpdatePollination: (state, { payload }: PayloadAction<Pollination>) => {
      let ind = state.pollinations.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.pollinations[ind] = payload;
    },
    DeletePollination: (
      { pollinations },
      { payload }: PayloadAction<number>
    ) => {
      let index = pollinations.findIndex((el) => el.id === payload);
      if (index !== -1) pollinations.splice(index, 1);
    },
    FetchPollinations: (state, { payload }: PayloadAction<Pollination[]>) => {
      state.pollinations = payload;
    },
  },
});

const {
  setStatus,
  InsertPollination,
  UpdatePollination,
  DeletePollination,
  FetchPollinations,
  ShowPollination,
} = PollinationsSlice.actions;

export const InsertPollinationAsync = (
  req: Pollination_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await pollinationService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertPollination(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowPollinationAsync = (
  req: Pollination_S_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await pollinationService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowPollination(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdatePollinationAsync = (
  req: Pollination_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await pollinationService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdatePollination(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeletePollinationAsync = (
  req: Pollination_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await pollinationService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeletePollination(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchPollinationsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await pollinationService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchPollinations(result.data));
    dispatch(setStatus('data'));
  }
};

export default PollinationsSlice.reducer;
