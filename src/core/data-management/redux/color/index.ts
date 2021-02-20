import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  colorService,
  Color,
  Color_U_Req,
  Color_S_Req,
  Color_I_Req,
  Color_D_Req,
} from '@core';

interface ColorsState {
  status: RequestStatus;
  colors: Color[];
  color?: Color;
}

let initialState: ColorsState = {
  status: 'no-thing',
  colors: [],
};

const ColorsSlice = createSlice({
  name: 'Colors',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertColor: ({ colors }, { payload }: PayloadAction<Color>) => {
      colors.push(payload);
    },
    ShowColor: (state, { payload }: PayloadAction<Color>) => {
      state.color = payload;
    },
    UpdateColor: (state, { payload }: PayloadAction<Color>) => {
      let ind = state.colors.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.colors[ind] = payload;
    },
    DeleteColor: ({ colors }, { payload }: PayloadAction<number>) => {
      let index = colors.findIndex((el) => el.id === payload);
      if (index !== -1) colors.splice(index, 1);
    },
    FetchColors: (state, { payload }: PayloadAction<Color[]>) => {
      state.colors = payload;
    },
  },
});

const {
  setStatus,
  InsertColor,
  UpdateColor,
  DeleteColor,
  FetchColors,
  ShowColor,
} = ColorsSlice.actions;

export const InsertColorAsync = (req: Color_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await colorService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertColor(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowColorAsync = (req: Color_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await colorService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowColor(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateColorAsync = (req: Color_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await colorService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateColor(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteColorAsync = (req: Color_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await colorService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteColor(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchColorsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await colorService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchColors(result.data));
    dispatch(setStatus('data'));
  }
};

export default ColorsSlice.reducer;
