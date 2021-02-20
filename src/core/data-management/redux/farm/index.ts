import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  farmService,
  Farm,
  Farm_U_Req,
  Farm_S_Req,
  Farm_I_Req,
  Farm_D_Req,
} from '@core';

interface FarmsState {
  status: RequestStatus;
  farms: Farm[];
  farm?: Farm;
}

let initialState: FarmsState = {
  status: 'no-thing',
  farms: [],
};

const FarmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertFarm: ({ farms }, { payload }: PayloadAction<Farm>) => {
      farms.push(payload);
    },
    ShowFarm: (state, { payload }: PayloadAction<Farm>) => {
      state.farm = payload;
    },
    UpdateFarm: (state, { payload }: PayloadAction<Farm>) => {
      let ind = state.farms.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.farms[ind] = payload;
    },
    DeleteFarm: ({ farms }, { payload }: PayloadAction<number>) => {
      let index = farms.findIndex((el) => el.id === payload);
      if (index !== -1) farms.splice(index, 1);
    },
    FetchFarms: (state, { payload }: PayloadAction<Farm[]>) => {
      state.farms = payload;
    },
  },
});

const {
  setStatus,
  InsertFarm,
  UpdateFarm,
  DeleteFarm,
  FetchFarms,
  ShowFarm,
} = FarmsSlice.actions;

export const InsertFarmAsync = (req: Farm_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await farmService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertFarm(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowFarmAsync = (req: Farm_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await farmService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowFarm(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateFarmAsync = (req: Farm_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await farmService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateFarm(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteFarmAsync = (req: Farm_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await farmService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteFarm(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchFarmsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await farmService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchFarms(result.data));
    dispatch(setStatus('data'));
  }
};

export default FarmsSlice.reducer;
