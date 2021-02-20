import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  vitaminService,
  Vitamin,
  Vitamin_U_Req,
  Vitamin_S_Req,
  Vitamin_I_Req,
  Vitamin_D_Req,
} from '@core';

interface VitaminsState {
  status: RequestStatus;
  vitamins: Vitamin[];
  vitamin?: Vitamin;
}

let initialState: VitaminsState = {
  status: 'no-thing',
  vitamins: [],
};

const VitaminsSlice = createSlice({
  name: 'Vitamins',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertVitamin: ({ vitamins }, { payload }: PayloadAction<Vitamin>) => {
      vitamins.push(payload);
    },
    ShowVitamin: (state, { payload }: PayloadAction<Vitamin>) => {
      state.vitamin = payload;
    },
    UpdateVitamin: (state, { payload }: PayloadAction<Vitamin>) => {
      let ind = state.vitamins.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.vitamins[ind] = payload;
    },
    DeleteVitamin: ({ vitamins }, { payload }: PayloadAction<number>) => {
      let index = vitamins.findIndex((el) => el.id === payload);
      if (index !== -1) vitamins.splice(index, 1);
    },
    FetchVitamins: (state, { payload }: PayloadAction<Vitamin[]>) => {
      state.vitamins = payload;
    },
  },
});

const {
  setStatus,
  InsertVitamin,
  UpdateVitamin,
  DeleteVitamin,
  FetchVitamins,
  ShowVitamin,
} = VitaminsSlice.actions;

export const InsertVitaminAsync = (req: Vitamin_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vitaminService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertVitamin(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowVitaminAsync = (req: Vitamin_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vitaminService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowVitamin(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateVitaminAsync = (req: Vitamin_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vitaminService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateVitamin(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteVitaminAsync = (req: Vitamin_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vitaminService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteVitamin(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchVitaminsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await vitaminService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchVitamins(result.data));
    dispatch(setStatus('data'));
  }
};

export default VitaminsSlice.reducer;
