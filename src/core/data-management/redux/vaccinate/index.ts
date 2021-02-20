import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  vaccinateService,
  Vaccinate,
  Vaccinate_U_Req,
  Vaccinate_S_Req,
  Vaccinate_I_Req,
  Vaccinate_D_Req,
} from '@core';

interface VaccinatesState {
  status: RequestStatus;
  vaccinates: Vaccinate[];
  vaccinate?: Vaccinate;
}

let initialState: VaccinatesState = {
  status: 'no-thing',
  vaccinates: [],
};

const VaccinatesSlice = createSlice({
  name: 'Vaccinates',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertVaccinate: (
      { vaccinates },
      { payload }: PayloadAction<Vaccinate>
    ) => {
      vaccinates.push(payload);
    },
    ShowVaccinate: (state, { payload }: PayloadAction<Vaccinate>) => {
      state.vaccinate = payload;
    },
    UpdateVaccinate: (state, { payload }: PayloadAction<Vaccinate>) => {
      let ind = state.vaccinates.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.vaccinates[ind] = payload;
    },
    DeleteVaccinate: ({ vaccinates }, { payload }: PayloadAction<number>) => {
      let index = vaccinates.findIndex((el) => el.id === payload);
      if (index !== -1) vaccinates.splice(index, 1);
    },
    FetchVaccinates: (state, { payload }: PayloadAction<Vaccinate[]>) => {
      state.vaccinates = payload;
    },
  },
});

const {
  setStatus,
  InsertVaccinate,
  UpdateVaccinate,
  DeleteVaccinate,
  FetchVaccinates,
  ShowVaccinate,
} = VaccinatesSlice.actions;

export const InsertVaccinateAsync = (req: Vaccinate_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vaccinateService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertVaccinate(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowVaccinateAsync = (req: Vaccinate_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vaccinateService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowVaccinate(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateVaccinateAsync = (req: Vaccinate_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vaccinateService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateVaccinate(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteVaccinateAsync = (req: Vaccinate_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await vaccinateService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteVaccinate(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchVaccinatesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await vaccinateService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchVaccinates(result.data));
    dispatch(setStatus('data'));
  }
};

export default VaccinatesSlice.reducer;
