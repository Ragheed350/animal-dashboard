import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import { ApiErrorNotification, isError, RequestStatus, statisticService, Statistic } from '@core';

interface StatisticssState {
  status: RequestStatus;
  animals_data: Statistic[];
  features_data: Statistic[];
  statistic?: Statistic;
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
  },
});

const { setStatus, FetchAnimalsStatistics, FetchFeatureStatistics } = StatisticssSlice.actions;

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

export default StatisticssSlice.reducer;
