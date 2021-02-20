import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  weightService,
  Weight,
  Weight_U_Req,
  Weight_S_Req,
  Weight_I_Req,
  Weight_D_Req,
} from '@core';

interface WeightsState {
  status: RequestStatus;
  weights: Weight[];
  weight?: Weight;
}

let initialState: WeightsState = {
  status: 'no-thing',
  weights: [],
};

const WeightsSlice = createSlice({
  name: 'Weights',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertWeight: ({ weights }, { payload }: PayloadAction<Weight>) => {
      weights.push(payload);
    },
    ShowWeight: (state, { payload }: PayloadAction<Weight>) => {
      state.weight = payload;
    },
    UpdateWeight: (state, { payload }: PayloadAction<Weight>) => {
      let ind = state.weights.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.weights[ind] = payload;
    },
    DeleteWeight: ({ weights }, { payload }: PayloadAction<number>) => {
      let index = weights.findIndex((el) => el.id === payload);
      if (index !== -1) weights.splice(index, 1);
    },
    FetchWeights: (state, { payload }: PayloadAction<Weight[]>) => {
      state.weights = payload;
    },
  },
});

const {
  setStatus,
  InsertWeight,
  UpdateWeight,
  DeleteWeight,
  FetchWeights,
  ShowWeight,
} = WeightsSlice.actions;

export const InsertWeightAsync = (req: Weight_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await weightService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertWeight(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowWeightAsync = (req: Weight_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await weightService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowWeight(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateWeightAsync = (req: Weight_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await weightService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateWeight(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteWeightAsync = (req: Weight_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await weightService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteWeight(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchWeightsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await weightService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchWeights(result.data));
    dispatch(setStatus('data'));
  }
};

export default WeightsSlice.reducer;
