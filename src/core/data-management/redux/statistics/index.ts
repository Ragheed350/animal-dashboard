import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import { ApiErrorNotification, isError, RequestStatus, statisticService, Statistic } from '@core';

interface StatisticssState {
  status: RequestStatus;
  animals_data: Statistic[];
  features_data: Statistic[];
  statistic?: Statistic;
  unreadRequestQrs?: number;
  unreadAnimals?: number;
  unreadFeatures?: number;
}

let initialState: StatisticssState = {
  status: 'no-thing',
  animals_data: [],
  features_data: [],
};

const StatisticssSlice = createSlice({
  name: 'Statisticss',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    FetchAnimalsStatistics: (state, { payload }: PayloadAction<Statistic[]>) => {
      state.animals_data = payload;
    },
    FetchFeatureStatistics: (state, { payload }: PayloadAction<Statistic[]>) => {
      state.features_data = payload;
    },
    FetchunReadRequestQrs: (state, { payload }: PayloadAction<number>) => {
      state.unreadRequestQrs = payload;
    },
    FetchunReadAnimals: (state, { payload }: PayloadAction<number>) => {
      state.unreadAnimals = payload;
    },
    FetchunReadFeatures: (state, { payload }: PayloadAction<number>) => {
      state.unreadFeatures = payload;
    },
  },
});

const {
  setStatus,
  FetchAnimalsStatistics,
  FetchFeatureStatistics,
  FetchunReadRequestQrs,
  FetchunReadAnimals,
  FetchunReadFeatures,
} = StatisticssSlice.actions;

export const FetchAnimalsStatisticsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchAnimals();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAnimalsStatistics(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchFeatureStatisticsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchFeature();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchFeatureStatistics(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchunReadRequestQrsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchunReadQrs();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchunReadRequestQrs(result.data));
    dispatch(setStatus('data'));
  }
};
export const FetchunReadFeaturesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchunReadFeatures();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchunReadFeatures(result.data));
    dispatch(setStatus('data'));
  }
};
export const FetchunReadAnimalsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await statisticService.FetchunReadAnimals();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchunReadAnimals(result.data));
    dispatch(setStatus('data'));
  }
};

export default StatisticssSlice.reducer;
