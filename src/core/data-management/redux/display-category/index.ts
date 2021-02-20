import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  displayCategoryService,
  DisplayCategory,
  DisplayCategory_U_Req,
  DisplayCategory_S_Req,
  DisplayCategory_I_Req,
  DisplayCategory_D_Req,
} from '@core';

interface DisplayCategoriesState {
  status: RequestStatus;
  displayCategories: DisplayCategory[];
  displayCategory?: DisplayCategory;
}

let initialState: DisplayCategoriesState = {
  status: 'no-thing',
  displayCategories: [],
};

const DisplayCategoriesSlice = createSlice({
  name: 'DisplayCategories',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertDisplayCategory: (
      { displayCategories },
      { payload }: PayloadAction<DisplayCategory>
    ) => {
      displayCategories.push(payload);
    },
    ShowDisplayCategory: (
      state,
      { payload }: PayloadAction<DisplayCategory>
    ) => {
      state.displayCategory = payload;
    },
    UpdateDisplayCategory: (
      state,
      { payload }: PayloadAction<DisplayCategory>
    ) => {
      let ind = state.displayCategories.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.displayCategories[ind] = payload;
    },
    DeleteDisplayCategory: (
      { displayCategories },
      { payload }: PayloadAction<number>
    ) => {
      let index = displayCategories.findIndex((el) => el.id === payload);
      if (index !== -1) displayCategories.splice(index, 1);
    },
    FetchDisplayCategories: (
      state,
      { payload }: PayloadAction<DisplayCategory[]>
    ) => {
      state.displayCategories = payload;
    },
  },
});

const {
  setStatus,
  InsertDisplayCategory,
  UpdateDisplayCategory,
  DeleteDisplayCategory,
  FetchDisplayCategories,
  ShowDisplayCategory,
} = DisplayCategoriesSlice.actions;

export const InsertDisplayCategoryAsync = (
  req: DisplayCategory_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await displayCategoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertDisplayCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowDisplayCategoryAsync = (
  req: DisplayCategory_S_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await displayCategoryService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowDisplayCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateDisplayCategoryAsync = (
  req: DisplayCategory_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await displayCategoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateDisplayCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteDisplayCategoryAsync = (
  req: DisplayCategory_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await displayCategoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteDisplayCategory(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchDisplayCategoriesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await displayCategoryService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchDisplayCategories(result.data));
    dispatch(setStatus('data'));
  }
};

export default DisplayCategoriesSlice.reducer;
