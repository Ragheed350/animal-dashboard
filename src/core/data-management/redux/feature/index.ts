import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  featureService,
  Feature,
  Feature_U_Req,
  Feature_S_Req,
  Feature_I_Req,
  Feature_D_Req,
} from '@core';

interface FeaturesState {
  status: RequestStatus;
  features: Feature[];
  feature?: Feature;
}

let initialState: FeaturesState = {
  status: 'no-thing',
  features: [],
};

const FeaturesSlice = createSlice({
  name: 'Features',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertFeature: ({ features }, { payload }: PayloadAction<Feature>) => {
      features.push(payload);
    },
    ShowFeature: (state, { payload }: PayloadAction<Feature>) => {
      state.feature = payload;
    },
    UpdateFeature: (state, { payload }: PayloadAction<Feature>) => {
      let ind = state.features.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.features[ind] = payload;
    },
    DeleteFeature: ({ features }, { payload }: PayloadAction<number>) => {
      let index = features.findIndex((el) => el.id === payload);
      if (index !== -1) features.splice(index, 1);
    },
    FetchFeatures: (state, { payload }: PayloadAction<Feature[]>) => {
      state.features = payload;
    },
  },
});

const {
  setStatus,
  InsertFeature,
  UpdateFeature,
  DeleteFeature,
  FetchFeatures,
  ShowFeature,
} = FeaturesSlice.actions;

export const InsertFeatureAsync = (req: Feature_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await featureService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertFeature(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowFeatureAsync = (req: Feature_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await featureService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowFeature(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateFeatureAsync = (req: Feature_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await featureService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateFeature(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteFeatureAsync = (req: Feature_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await featureService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteFeature(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchFeaturesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await featureService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchFeatures(result.data));
    dispatch(setStatus('data'));
  }
};

export default FeaturesSlice.reducer;
