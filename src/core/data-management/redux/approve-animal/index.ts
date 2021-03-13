import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  approveAnimalService,
  ApproveAnimal,
  ApproveAnimal_I_Req,
} from '@core';

interface ApproveAnimalsState {
  status: RequestStatus;
  UnapprovedAnimals: ApproveAnimal[];
  ApprovedAnimal?: ApproveAnimal;
}

let initialState: ApproveAnimalsState = {
  status: 'no-thing',
  UnapprovedAnimals: [],
};

const ApproveAnimalsSlice = createSlice({
  name: 'ApproveAnimals',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    ApproveAnimal: (state, { payload }: PayloadAction<ApproveAnimal>) => {
      let ind = state.UnapprovedAnimals.findIndex(
        (el) => el.animal.id === payload.animal.id
      );
      if (ind !== -1) state.UnapprovedAnimals[ind] = payload;
    },
    FetchUnapprovedAnimals: (
      state,
      { payload }: PayloadAction<ApproveAnimal[]>
    ) => {
      state.UnapprovedAnimals = payload;
    },
  },
});

const {
  setStatus,
  ApproveAnimal,
  FetchUnapprovedAnimals,
} = ApproveAnimalsSlice.actions;

export const ApproveAnimalAsync = (
  req: ApproveAnimal_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await approveAnimalService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ApproveAnimalAsync(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchUnapprovedAnimalsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await approveAnimalService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchUnapprovedAnimals(result.data));
    dispatch(setStatus('data'));
  }
};

export default ApproveAnimalsSlice.reducer;
