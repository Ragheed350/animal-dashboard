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
  FeatureForApprove,
} from '@core';
import { ApiSuccessNotification } from '@utils';
import { FeatureForApprove_Req } from '../../models';

interface FeaturesState {
  status: RequestStatus;
  features: Feature[];
  featuresApprove: FeatureForApprove[];
  feature?: Feature;
}

let initialState: FeaturesState = {
  status: 'no-thing',
  features: [],
  featuresApprove: [],
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
    FetchFeaturesApprove: (
      state,
      { payload }: PayloadAction<FeatureForApprove[]>
    ) => {
      state.featuresApprove = payload;
    },
    InsertFeaturesApprove: (
      state,
      { payload }: PayloadAction<FeatureForApprove>
    ) => {
      state.featuresApprove.push(payload);
    },
    UpdateFeaturesApprove: (
      state,
      { payload }: PayloadAction<FeatureForApprove>
    ) => {
      let ind = state.featuresApprove.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.featuresApprove[ind] = payload;
    },
    DeleteFeaturesApprove: (
      { featuresApprove },
      { payload }: PayloadAction<number>
    ) => {
      let index = featuresApprove.findIndex((el) => el.id === payload);
      if (index !== -1) featuresApprove.splice(index, 1);
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
  // DeleteFeaturesApprove,
  FetchFeaturesApprove,
  UpdateFeaturesApprove,
  InsertFeaturesApprove,
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

export const listFeaturesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await featureService.list();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchFeaturesApprove(result.data));
    dispatch(setStatus('data'));
  }
};

export const addFeatureUserAsync = (
  req: FeatureForApprove_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await featureService.add(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertFeaturesApprove(result.data));
    dispatch(setStatus('data'));
  }
};
export const removeFeatureUserAsync = (
  req: FeatureForApprove_Req&{id:number}
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await featureService.remove(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertFeaturesApprove(result.data));
    dispatch(setStatus('data'));
  }
};

export const approveFeatureAsync = (req: {
  id: number | string;
  user_id: number | string;
  feature_id: number | string;
}): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await featureService.approve(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateFeaturesApprove(result.data));
    ApiSuccessNotification({ mes: ['Done!', 'تم!'] });
    dispatch(setStatus('data'));
  }
};

export default FeaturesSlice.reducer;
